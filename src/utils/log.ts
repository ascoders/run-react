import * as colors from 'colors';
import * as ora from 'ora';

export function print(message: string) {
  // tslint:disable-next-line:no-console
  console.log(message);
}

export async function spinner(message: string, fn: (spinner: any) => any) {
  const oraSpinner = ora(colors.green(message)).start();

  try {
    await fn(oraSpinner);
    oraSpinner.succeed(colors.gray.dim(message));
  } catch (error) {
    oraSpinner.fail(colors.red(error.toString()));
    process.exit(0);
  }
}
