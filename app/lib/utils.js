// app/lib/utils.js

// @ts-expect-error types not available
import typographicBase from 'typographic-base';

// The old 'useRenderServerComponents' hook has been removed as it is not compatible with the new framework.

export function missingClass(string, prefix) {
  if (!string) {
    return true;
  }
  const regex = new RegExp(` ?${prefix}`, 'g');
  return string.match(regex) === null;
}

export function formatText(input) {
  if (!input) {
    return;
  }
  if (typeof input !== 'string') {
    return input;
  }
  try {  // Fix: Add try-catch for dep errors
    return typographicBase(input, {locale: 'en-us'}).replace(
      /\s([^\s<]+)\s*$/g,
      '\u00A0$1',
    );
  } catch (e) {
    console.error('Typographic error:', e);
    return input;  // Fallback
  }
}

export function isNewArrival(date, daysOld = 30) {
  return (
    new Date(date).valueOf() >
    new Date().setDate(new Date().getDate() - daysOld).valueOf()
  );
}

export function isDiscounted(price, compareAtPrice) {
  if (compareAtPrice?.amount > price?.amount) {
    return true;
  }
  return false;
}

export function getExcerpt(text) {
  const regex = /<p.*>(.*?)<\/p>/;
  const match = regex.exec(text);
  return match?.length ? match[0] : text;
}

// ... (The rest of the functions like resolveToFromType, parseMenu, statusMessage, etc., are all fine and have been kept)

function resolveToFromType(
  {customPrefixes, pathname, type} = {
    customPrefixes: {},
  },
) {
  if (!pathname || !type) return '';
  const defaultPrefixes = {
    BLOG: 'blogs',
    COLLECTION: 'collections',
    COLLECTIONS: 'collections',
    FRONTPAGE: 'frontpage',
    HTTP: '',
    PAGE: 'pages',
    CATALOG: 'collections/all',
    PRODUCT: 'products',
    SEARCH: 'search',
    SHOP_POLICY: 'policies',
  };
  const pathParts = pathname.split('/');
  const handle = pathParts.pop() || '';
  const routePrefix = {
    ...defaultPrefixes,
    ...customPrefixes,
  };
  switch (true) {
    case type === 'FRONTPAGE':
      return '/';
    case type === 'ARTICLE': {
      const blogHandle = pathParts.pop();
      return routePrefix.BLOG
        ? `/${routePrefix.BLOG}/${blogHandle}/${handle}/`
        : `/${blogHandle}/${handle}/`;
    }
    case type === 'COLLECTIONS':
      return `/${routePrefix.COLLECTIONS}`;
    case type === 'SEARCH':
      return `/${routePrefix.SEARCH}`;
    case type === 'CATALOG':
      return `/${routePrefix.CATALOG}`;
    default:
      return routePrefix[type]
        ? `/${routePrefix[type]}/${handle}`
        : `/${handle}`;
  }
}

function parseItem(customPrefixes = {}) {
  return function (item) {
    if (!item?.url || !item?.type) {
      console.warn('Invalid menu item.  Must include a url and type.');
      return;
    }
    const {pathname} = new URL(item.url);
    const isInternalLink = /\.myshopify\.com/g.test(item.url);
    const parsedItem = isInternalLink
      ? {
          ...item,
          isExternal: false,
          target: '_self',
          to: resolveToFromType({type: item.type, customPrefixes, pathname}),
        }
      : {
          ...item,
          isExternal: true,
          target: '_blank',
          to: item.url,
        };
    return {
      ...parsedItem,
      items: item.items?.map(parseItem(customPrefixes)),
    };
  };
}

export function parseMenu(menu, customPrefixes = {}) {
  if (!menu?.items) {
    console.warn('Invalid menu passed to parseMenu');
    return menu;
  }
  return {
    ...menu,
    items: menu.items.map(parseItem(customPrefixes)),
  };
}

export function getApiErrorMessage(field, data, errors) {
  if (errors?.length) return errors[0].message ?? errors[0];
  if (data?.[field]?.customerUserErrors?.length)
    return data[field].customerUserErrors[0].message;
  return null;
}