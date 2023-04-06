import { useState } from 'react';
import { getUserListInfo } from '../apis/instance';
import { ChakraProvider, Flex, Select } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import DataTable from './Table';
import CheckBox from './CheckBox';
import { getTodayDate } from '../utils/date-utils/dateCalculator';

interface PostType {
  id: string;
  title: string;
  postUrl: string;
  visibility: string;
  categoryId: string;
  comments: string;
  trackbacks: string;
  date: string;
}

interface DateCountMapType {
  [date: string]: number;
}

interface ListRequestType {
  listRequest: string;
}

function List({ listRequest }: ListRequestType) {
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];
  const [dateCountMap, setDateCountMap] = useState<DateCountMapType>({});
  const [select, setSelect] = useState({ year: '', month: '' });
  const [isChecked, setIsChecked] = useState([true, true, true]);
  const [weeks, setWeeks] = useState(0);
  const [days, setDays] = useState(0);

  const getPageList = async (pageNumber: number, selectedDate: string) => {
    const item = await getUserListInfo(`${listRequest}&page=${pageNumber}`);

    //유효 날짜
    const availablePosts: PostType[] = item.tistory.item.posts.filter(
      (post: PostType) => new Date(selectedDate) <= new Date(post.date.split(' ')[0]),
    );
    //visibility 글 공개 단계
    //발행 20
    const publishedPosts = isChecked[0]
      ? availablePosts.filter((post: PostType) => post.visibility === '20')
      : [];
    //보호 15
    const protectedPosts = isChecked[1]
      ? availablePosts.filter((post: PostType) => post.visibility === '15')
      : [];
    //비공개 0
    const privatePosts = isChecked[2]
      ? availablePosts.filter((post: PostType) => post.visibility === '0')
      : [];

    const resultPosts = [...publishedPosts, ...protectedPosts, ...privatePosts];
    const availableCountPosts = resultPosts.map((post: PostType) => post.date.split(' ')[0]);

    if (availablePosts.length !== item.tistory.item.posts.length) {
      return { result: true, postResult: availableCountPosts };
    }
    return { result: false, postResult: availableCountPosts };
  };

  const getSelectedDate = (year: string, month: string) => {
    return year + '-' + month.padStart(2, '0') + '-' + '01';
  };

  const getTotalWeeks = () => {
    const { year, month, date } = getTodayDate();

    const startDate = new Date(year, month, date);
    const endDate = new Date(parseInt(select.year), parseInt(select.month), 1);

    setWeeks(((startDate.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24) + 1) / 7);
  };

  const getTotalDays = () => {
    const { year, month, date } = getTodayDate();

    const startDate = new Date(year, month, date);
    const endDate = new Date(parseInt(select.year), parseInt(select.month), 1);

    setDays((startDate.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24) + 1);
  };

  const getSearchPage = async (date: string) => {
    let arr: string[] = [];
    for (let page = 1; ; page += 1) {
      const { result, postResult } = await getPageList(page, date);
      arr = [...arr, ...postResult];
      if (result) break;
    }
    return arr;
  };
  const onChangeHandler = (index: number) => () => {
    const tmp = [...isChecked];
    tmp[index] = !tmp[index];
    setIsChecked([...tmp]);
  };

  const setDateCountObject = (dateArr: string[]) => {
    const dateSet = dateArr.reduce((acc: DateCountMapType, cur: string): DateCountMapType => {
      if (acc[cur] === undefined) {
        return { ...acc, [cur]: 1 };
      }
      return { ...acc, [cur]: acc[cur] + 1 };
    }, {});
    setDateCountMap({ ...dateSet });
  };

  const handleSearchButton = async () => {
    const selectedDate = getSelectedDate(select.year, select.month);
    getTotalWeeks();
    getTotalDays();
    const dateArr = await getSearchPage(selectedDate);
    setDateCountObject(dateArr);
  };

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setSelect({ ...select, [name]: value });
  };

  return (
    <ChakraProvider>
      <Flex width={'500px'} gap={4}>
        <Select placeholder="year" name="year" onChange={handleSelectOption}>
          {year.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select placeholder="month" name="month" onChange={handleSelectOption}>
          {month.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </Select>
        <Button colorScheme="yellow" onClick={handleSearchButton}>
          조회
        </Button>
      </Flex>
      <CheckBox values={['발행', '보호', '비공개']} onChangeHandler={onChangeHandler} size={'sm'} />
      <Flex width={'500px'} gap={4}>
        <DataTable data={dateCountMap} weeks={weeks} days={days} />
      </Flex>
    </ChakraProvider>
  );
}

export default List;
