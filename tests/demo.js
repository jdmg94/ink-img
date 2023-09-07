import React from 'react';
import path from 'node:path'
import {render} from 'ink';
import Img from '../src';

const Demo = () => <Img src={path.join(process.cwd(), 'assets/test.gif')} />;

render(<Demo />);
