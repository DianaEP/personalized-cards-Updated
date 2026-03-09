import React from 'react';
import StampSvg from '../assets/svg/stamp.svg';
import FamilySvg from '../assets/svg/family.svg';
import SunSvg from '../assets/svg/sun.svg';
import BikiniSvg from '../assets/svg/bikini.svg';
import BeachSvg from '../assets/svg/beach.svg';
import YachtSvg from '../assets/svg/yacht.svg'
import { SvgProps } from 'react-native-svg';

export interface AssetSvg {
    id: string;
    svg: React.FC<SvgProps> // Type for React component SVG

}

export const ASSETS_SVG: AssetSvg[] = [
    { id: '1', svg: YachtSvg },
    { id: '2', svg: StampSvg },
    { id: '3', svg: FamilySvg }, 
    { id: '4', svg: SunSvg },
    { id: '5', svg: BikiniSvg },
    { id: '6', svg: BeachSvg },
];