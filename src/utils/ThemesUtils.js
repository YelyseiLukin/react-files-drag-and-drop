import React from 'react';

export const THEMES = {
    DAY: 'DAY',
    NIGHT: 'NIGHT',
};

export const getOppositeTheme = (theme) => {
    return theme === THEMES.DAY ? THEMES.NIGHT : THEMES.DAY;
};

export const THEME = 'theme';

export const NIGHT_MODE_CLASS = 'night-mode';

export const ThemeContext = React.createContext(THEMES.DAY);
