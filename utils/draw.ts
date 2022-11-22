export const draw = (arr: unknown[]) => {
  const pool = arr.map((_, index) => index);
  let result = [];

  if (arr.length <= 1) return [...arr];

  for (let i = 0; i < arr.length - 1; i++) {
    let index: number;

    do {
      index = Math.floor(Math.random() * pool.length);
    } while (index === i);

    result.push(arr[pool.splice(index, 1)[0]]);
  }

  if (pool[0] === arr.length - 1) {
    result.push(result.at(-1));
    result[result.length - 2] = arr[pool[0]];
  } else {
    result.push(arr[pool[0]]);
  }

  return result;
};
