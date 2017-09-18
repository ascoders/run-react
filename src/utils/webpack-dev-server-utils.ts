import * as colors from 'colors';
import * as webpack from 'webpack';
import { getWebpackConfig } from '../webpack.dev.config';
import { formatWebpackMessages } from './format-webpack-message';
import { runServer } from './server';

export async function createCompiler(webpackPort: number) {
  const webpackDevConfig = await getWebpackConfig(webpackPort);

  // "Compiler" is a low-level interface to Webpack.
  // It lets us listen to some events and provide our own custom messages.
  let compiler;
  try {
    compiler = webpack(webpackDevConfig);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(colors.red('Failed to compile.'));
    // tslint:disable-next-line:no-console
    console.log();
    // tslint:disable-next-line:no-console
    console.log(err.message || err);
    // tslint:disable-next-line:no-console
    console.log();
    process.exit(1);
  }

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', () => {
    // tslint:disable-next-line:no-console
    console.log('Compiling...');
  });

  let isFirstCompile = true;

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', async (stats: any) => {
    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    const messages = formatWebpackMessages(stats.toJson({}, true));

    if (isFirstCompile) {
      await runServer(webpackPort);
    }
    isFirstCompile = false;

    // If errors exist, only show errors.
    if (messages.errors.length) {
      // tslint:disable-next-line:no-console
      console.log(colors.red('Failed to compile.\n'));
      // tslint:disable-next-line:no-console
      console.log(messages.errors.join('\n\n'));
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      // tslint:disable-next-line:no-console
      console.log(colors.yellow('Compiled with warnings.\n'));
      // tslint:disable-next-line:no-console
      console.log(messages.warnings.join('\n\n'));
    }
  });
  return compiler;
}
