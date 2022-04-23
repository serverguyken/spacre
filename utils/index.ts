import moment from 'moment';
export function print(...args: any) {
  console.log(...args);
  return null;
}

export function setClass(...classesArr: string[]) {
  return classesArr.join(' ');
}


export function addClass(element: HTMLElement, ...classesArr: string[]) {
  if (isBrowser()) {
    const class_element = element.classList;
    classesArr.forEach(class_name => {
      class_element.add(class_name);
    });
  }
}

export function removeClass(element: HTMLElement, ...classesArr: string[]) {
  if (isBrowser()) {
    const class_element = element.classList;
    classesArr.forEach(class_name => {
      class_element.remove(class_name);
    });
  }
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function isClient(): boolean {
  return typeof document !== 'undefined';
}

export function isSearchQuery(route: string): { isSearchQuery: boolean; query: string | null } {
  let isSearchQuery = false;
  let searchQueryValue = null
  if (route.indexOf('q=') > -1) {
    searchQueryValue = route.split('q=')[1].split('&')[0];
    if (searchQueryValue.length > 0) {
      isSearchQuery = true;
    }
  }
  return {
    isSearchQuery: isSearchQuery,
    query: searchQueryValue
  };
}

export function serachQueryKeyValues(route: string): { [key: string]: string } {
  const queryObj: {
    [key: string]: string;
  } | any = {};
  if (route.indexOf('q=') > -1) {
    // get queries from route e.g q=tech&click=hashtag
    const query = route.split('q=')[1].split('&');
    query.forEach(q => {
      const keyValue = q.split('=')
      queryObj['q'] = isSearchQuery(route).query;
      if (keyValue.length > 1) {
        queryObj[keyValue[0]] = keyValue[1];
      }
    });
  }
  return queryObj;
}

export function generateUsername() {
  const randomNumber = Math.floor(Math.random() * 10000);
  const wordsList = [
    'Dev', 'Destiny', 'Mango', 'Cat',
    'Dog', 'Lion', 'Elephant', 'Tiger',
    'Monkey', 'Bear', 'Fox', 'Horse',
    'Zebra', 'Giraffe', 'Lion', 'Elephant',
    'Tiger', 'Monkey', 'Bear', 'Sparrow',
    'Pigeon', 'Dove', 'Parrot', 'Owl',
    'Night', 'Day', 'Sun', 'Moon',
    'Star', 'Cloud', 'Rain', 'Thunder',
    'Wind', 'Snow', 'Fire', 'Water',
    'Earth', 'Life', 'Love', 'Peace',
    'Life', 'No', 'Creation', 'Freedom',
    'Creator', 'Nature', 'Happy', 'Short',
    'Tall', 'Big', 'Small', 'Long',
    'System', 'Program', 'Software', 'Game',
    'Compatibility', 'Compiler', 'Compiler', 'Compiler',
    'Code', 'User', 'Template', 'Flow',
    'One', 'Two', 'Three', 'Four',
    'Five', 'Six', 'Seven', 'Eight',
    'Nine', 'Ten', 'Eleven', 'Twelve',
    'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen', 'Twenty',
    'Thirty', 'Forty', 'Fifty', 'Sixty',
    'Seventy', 'Eighty', 'Ninety', 'Hundred',
    'Thousand', 'Million', 'Billion', 'Trillion',
    'Book', 'Pen', 'Pencil', 'Notebook',
    'Boy', 'Girl', 'Kid', 'Grand'
  ]
  let twoDigits = Math.floor(Math.random() * 90 + 10)
  let username = wordsList[Math.floor(Math.random() * wordsList.length)] + twoDigits
  username += wordsList[Math.floor(Math.random() * wordsList.length)] = '_'
  username += wordsList[Math.floor(Math.random() * wordsList.length)]
  username += randomNumber
  return username.substring(0, 20);
}

export function generateFirstWord(str: string) {
  if (str.length > 0) {
    return str[0];
  }
  return '';
}


export function generateLoadingTime(from: number, to: number) {
  return Math.floor(Math.random() * (to - from) + from);
}

export function OnLoad(callback: () => void) {
  if (isBrowser()) {
    window.onload = callback;
  }
}

export function StorageEvent(callback: (event: StorageEvent) => void) {
  if (isBrowser()) {
    window.addEventListener('storage', callback);
  }
}

export function TimeOut(callback: () => void, time: number) {
  setTimeout(callback, time);
}

export function Interval(callback: () => void, time: number) {
  setInterval(callback, time);
}

export function toHHMMSS(time: number) {
  const sec_num = parseInt(time.toString(), 10);
  let hours: any = Math.floor(sec_num / 3600);
  let minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds: any = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds;
}

import linkify, { LinkifyIt } from 'linkify-it';
import tlds from 'tlds';
export const isLink = (str: string) => {
  const linkifyit: LinkifyIt = linkify().tlds(tlds);
  return linkifyit.match(str);
}

export const Linky = {
  get: (str: string) => {
    const linkifyit: LinkifyIt = linkify().tlds(tlds);
    const matches = linkifyit.match(str);
    if (matches) {
      return matches[0];
    }
    return null;
  },
  getAll: (str: string) => {
    const linkifyit: LinkifyIt = linkify().tlds(tlds);
    const matches = linkifyit.match(str);
    if (matches) {
      return matches;
    }
    return [];
  },
  getUrl: (str: string) => {
    const linkifyit: LinkifyIt = linkify().tlds(tlds);
    const matches = linkifyit.match(str);
    if (matches) {
      return matches[0].url;
    }
    return null;
  },
  isLink: (str: string) => {
    const linkifyit: LinkifyIt = linkify().tlds(tlds);
    const matches = linkifyit.match(str);
    if (matches && matches.length > 0) {
      return true;
    }
    return false;
  }
}

export const getLink = (str: string) => {
  const linkifyit: LinkifyIt = linkify().tlds(tlds);
  return linkifyit.match(str);
}

export function countSet(num: number, upper?: boolean) {
  let value = `${num}`
  let unit = ''
  if (value.length === 0 || value.length === 1 || value.length === 2 || value.length === 3) {
    value = `${value}`
  } else if (value.length === 4 || value.length === 5 || value.length === 6) {
    unit = upper ? 'K' : 'k'
    value = `${(num / 1000).toFixed(1)}${unit}`
  } else if (value.length === 7 || value.length === 8 || value.length === 9) {
    unit = upper ? 'M' : 'm'
    value = `${(num / 1000000).toFixed(1)}${unit}`
  } else if (value.length === 10 || value.length === 11 || value.length === 12) {
    unit = upper ? 'B' : 'b'
    value = `${(num / 1000000000).toFixed(1)}${unit}`
  } else if (value.length === 13 || value.length === 14 || value.length === 15) {
    unit = upper ? 'T' : 't'
    value = `${(num / 1000000000000).toFixed(1)}${unit}`
  } else if (value.length === 16 || value.length === 17 || value.length === 18) {
    unit = upper ? 'Q' : 'q'
    value = `${(num / 1000000000000000).toFixed(1)}${unit}`
  } else if (value.length === 19 || value.length === 20 || value.length === 21) {
    value
  }
  const return_value = {
    value: value,
    unit: unit,
    inital_value: num
  }
  return return_value
}


export const toHTML = (text: string) => {
  const original_text = text
  let changed_text = text
  // regex to replace all mentions with a link and hashtags with a link and links with only http and https with a link
  const MENTION_REGEX = /(^|\s)(@[a-zA-Z0-9_]+)/g
  const HASHTAG_REGEX = /(^|\s)(#[a-zA-Z0-9_]+)/g
  // link regex domain is optional e.g http(s):web and http(s):web.com are valid
  const valid_domain_prefix = "(http(s)?:\\/\\/|www\\.)"
  const valid_domain_suffix = "(\\.\\w+|\\w+\\.\\w+|\\w+)"
  const LINK_REGEX = /(^|\s)((http(s)?:\/\/)?(www\.)?[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+[a-zA-Z0-9_]*)/g
  // if text contains a mention, replace it with a link
  if (text.match(MENTION_REGEX)) {
    // relpace all mentions with a link to the user's profile e.g @rr = <a href="/rr">@rr</a>
    changed_text = changed_text.replace(MENTION_REGEX, (match, p1, p2) => {
      return `${p1}<a href="/${p2.substring(1)}" class="text-link">${p2}</a>`
    })
  }
  // if text contains a hashtag, replace it with a link
  if (text.match(HASHTAG_REGEX)) {
    // replace all hashtags with a link to the hashtag page e.g #rr = <a href="/hashtag/rr">#rr</a>
    changed_text = changed_text.replace(HASHTAG_REGEX, (match, p1, p2) => {
      return `${p1}<a href="/hashtag/${p2.substring(1)}" class="text-link">${p2}</a>`
    })
  }
  // if text contains a link, replace it with a link
  if (text.match(LINK_REGEX)) {
    // replace all links with a link to the link e.g https://www.web.com = <a href="https://www.web.com">https://www.web.com</a>
    if (isLink(text)) {
      changed_text = changed_text.replace(LINK_REGEX, (match, p1, p2) => {
        return `${p1}<a href="${p2}" class="text-link">${p2}</a>`
      })
    }
  }
  // if text contains a new line, replace it with a br
  if (text.match(/\n/g)) {
    changed_text = changed_text.replace(/\n/g, "<br>")
  }
  return {
    _html: changed_text,
    _text: original_text
  }
}



export function getTypeByTrigger(trigger: string) {
  switch (trigger) {
    case '@':
      return 'mention' ? 'mention' : `${trigger}mention`;
    case '#':
      return 'hashtag' ? 'hashtag' : `${trigger}hashtag`;
    default:
      return '';
  }
}

export function findWithRegex(regex: any, contentBlock: any, callback: any) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

export function Strategy(regex: string, contentBlock: any, callback: any, contentState: any) {
  findWithRegex(regex, contentBlock, callback);
}

export function formatDate(date: string) {
  const setup = {
    format: (format: string) => {
      return moment(date).format(format) === 'Invalid date' ? '' : moment(date).format(format)
    },
    startOf: (unit: string) => {
      const ago: any = moment(date).fromNow();
      const current_date = moment(new Date().toISOString());
      const date_diff = current_date.diff(moment(date), 'hours') + 1;
      const future_date = moment(date).isAfter(current_date);
      const days_ago = moment(date).isBefore(moment().subtract(1, 'days'));
      if (date_diff >= 24 || future_date) {
        return ''
      } else if (date_diff === 23) {
        return `23 hours ago`
      } else if (date_diff === 22) {
        return `22 hours ago`
      } else if (date_diff === 21) {
        return `21 hours ago`
      }
      else {
        if (ago !== 'Invalid date') {
          if (ago === 'a few seconds ago') {
            return date_diff === 0 ? 'now' : `${date_diff}s`
          } else if (ago === 'a minute ago') {
            return date_diff === 0 ? '' : `${date_diff}m`
          } else if (ago === 'an hour ago') {
            return date_diff === 0 ? '' : `${date_diff}h`
          } else if (parseInt(ago.split(' ')[0]) === NaN) {
            return ''
          } else {
            const ago_time = parseInt(ago.split(' ')[0]);
            const ago_unit = ago.split(' ')[1] === 'hours' ? 'h' : 'm';
            return `${ago_time}${ago_unit}`
          }
        } else {
          return ''
        }
      }
    },
  }
  return setup;
}