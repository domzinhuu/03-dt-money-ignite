export async function asyncRequestSimulate(timer = 2000) {
  await new Promise((resolve) => setTimeout(resolve, timer));
}
