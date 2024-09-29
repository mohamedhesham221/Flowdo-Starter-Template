import { trans as t } from 'zora-js'
import { Zora } from '../zora.js'

// window.locale = document.documentElement.lang; // optional if not set in app.blade.php

export function __(key, replace=key, config = Zora) {
    return t(key, replace, config);
}
export function trans(key, replace=key, config = Zora) {
    return t(key, replace, config);
}