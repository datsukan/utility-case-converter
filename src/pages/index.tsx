import clsx from 'clsx';
import { useState } from 'react';

import AfterCase from '@/components/AfterCase';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

const delayTime = 3000;

export default function HomePage() {
  const [mode, setMode] = useState<'dark' | 'light'>('light');
  function toggleMode() {
    return mode === 'dark' ? setMode('light') : setMode('dark');
  }

  const [targetString, setTargetString] = useState('');
  const [upperCase, setUpperCase] = useState('');
  const [lowerCase, setLowerCase] = useState('');
  const [properCase, setProperCase] = useState('');
  const [sentenceCase, setSentenceCase] = useState('');
  const [camelCase, setCamelCase] = useState('');
  const [pascalCase, setPascalCase] = useState('');
  const [snakeCase, setSnakeCase] = useState('');
  const [kebabCase, setKebabCase] = useState('');
  const toUpperCase = (value: string) => {
    return value.toUpperCase();
  };
  const toLowerCase = (value: string) => {
    return value.toLowerCase();
  };
  const toProperCase = (value: string) => {
    const properCaseValue = value.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
    return properCaseValue;
  };
  const toSentenceCase = (value: string) => {
    const sentenceCaseValue =
      value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
    return sentenceCaseValue;
  };
  const toCamelCase = (value: string) => {
    const pascalCaseValue = toPascalCase(value);
    const camelCaseValue =
      pascalCaseValue.charAt(0).toLowerCase() + pascalCaseValue.slice(1);
    return camelCaseValue;
  };
  const toPascalCase = (value: string) => {
    const properCaseValue = toProperCase(value);
    const pascalCaseValue = properCaseValue.replace(/ /g, '');
    return pascalCaseValue;
  };
  const toSnakeCase = (value: string) => {
    const lowerCaseValue = toLowerCase(value);
    const snakeCaseValue = lowerCaseValue.replace(/ /g, '_');
    return snakeCaseValue;
  };
  const toKebabCase = (value: string) => {
    const lowerCaseValue = toLowerCase(value);
    const kebabCaseValue = lowerCaseValue.replace(/ /g, '-');
    return kebabCaseValue;
  };
  const updateValue = (value: string) => {
    // eslint-disable-next-line no-irregular-whitespace
    value = value.replace(/　/g, ' ');
    value = value.replace(/\x20\x20/g, ' ');
    setTargetString(value);
    setUpperCase(toUpperCase(value));
    setLowerCase(toLowerCase(value));
    setProperCase(toProperCase(value));
    setSentenceCase(toSentenceCase(value));
    setCamelCase(toCamelCase(value));
    setPascalCase(toPascalCase(value));
    setSnakeCase(toSnakeCase(value));
    setKebabCase(toKebabCase(value));
  };

  const clear = () => {
    updateValue('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(targetString).then(
      (_success) => successfullyCopied(),
      (_error) => failedToCopy()
    );
  };

  const pasteFromClipboard = () => {
    navigator.clipboard.readText().then((clipText) => updateValue(clipText));
  };

  const setSample = () => {
    const sampleValue = 'Convert string format';
    updateValue(sampleValue);
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailedMessage, setShowFailedMessage] = useState(false);
  const successfullyCopied = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), delayTime);
  };
  const failedToCopy = () => {
    setShowFailedMessage(true);
    setTimeout(() => setShowFailedMessage(false), delayTime);
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section
          className={clsx(
            mode === 'dark' ? 'bg-dark' : 'bg-gray-50',
            mode === 'dark' ? 'text-white' : 'text-black',
            'sky'
          )}
        >
          <div className='layout min-h-screen py-20 px-2 text-left'>
            <div className='flex flex-wrap justify-between gap-2'>
              <h1>Case Converter</h1>
              <Button
                onClick={toggleMode}
                variant={mode === 'dark' ? 'light' : 'dark'}
              >
                Set to {mode === 'dark' ? 'light' : 'dark'}
              </Button>
            </div>

            <p className='mt-6 text-sm'>
              命名規則などに関連する文字列の表現を変換するツールです。
              <br />
              入力された文字列はどこにも送信されず、クライアントサイドのみで処理されます。
            </p>

            <p className='mt-4'>
              Created by{' '}
              <UnderlineLink href='https://datsukan.me'>datsukan</UnderlineLink>
              .
            </p>

            <div className='my-12 flex w-full flex-col gap-6'>
              <div>
                <h2 className='md:text-lg'>Target string</h2>
                <div className='mt-2 flex flex-wrap items-center gap-2'>
                  <Button variant='light' onClick={() => clear()}>
                    Clear
                  </Button>
                  <Button variant='light' onClick={() => copyToClipboard()}>
                    Copy
                  </Button>
                  <Button variant='light' onClick={() => pasteFromClipboard()}>
                    Paste
                  </Button>
                  <Button variant='light' onClick={() => setSample()}>
                    Sample
                  </Button>
                  {showSuccessMessage && (
                    <span className='text-xs text-green-600'>
                      successfully copied 😆
                    </span>
                  )}
                  {showFailedMessage && (
                    <span className='text-xs text-red-600'>
                      Failed to copy 😫
                    </span>
                  )}
                </div>
                <textarea
                  placeholder='e.g.) Convert string format'
                  rows={4}
                  className='mt-2 w-full rounded-md text-black'
                  value={targetString}
                  onChange={(e) => updateValue(e.target.value)}
                />
              </div>

              <hr />

              <AfterCase label='UPPER CASE' value={upperCase} />
              <AfterCase label='lower case' value={lowerCase} />
              <AfterCase label='Proper Case' value={properCase} />
              <AfterCase label='Sentence case' value={sentenceCase} />
              <AfterCase label='camelCase' value={camelCase} />
              <AfterCase label='PascalCase' value={pascalCase} />
              <AfterCase label='snake_case' value={snakeCase} />
              <AfterCase label='kebab-case' value={kebabCase} />
            </div>

            <footer
              className={clsx(mode === 'dark' ? 'text-white' : 'text-black')}
            >
              © 2022 datsukan
              <p className='mt-2 text-sm'>
                <ArrowLink href='https://github.com/datsukan/utility-case-converter'>
                  See the repository
                </ArrowLink>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
