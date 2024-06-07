import {proxy} from 'valtio';

const state = proxy({
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './Bamboo.png',
    fullDecal: './Bamboo.png'
})

export default state;