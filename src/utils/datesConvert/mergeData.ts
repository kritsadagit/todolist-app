import {Section} from "../../screens/types/todo-list/todo-list";

export const mergeData = (data1: Section[], data2: Section[]): Section[] => {
  const mergedData: Section[] = [...data1];

  data2.forEach(entry => {
    const index = mergedData.findIndex(item => item.title === entry.title);
    if (index !== -1) {
      mergedData[index].data = mergedData[index].data.concat(entry.data);
    } else {
      mergedData.push(entry);
    }
  });

  return mergedData;
};
