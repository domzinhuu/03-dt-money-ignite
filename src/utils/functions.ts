export async function asyncRequestSimulate(timer = 1000) {
  await new Promise((resolve) => setTimeout(resolve, timer));
}
