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
        isSearchQuery = true;
        searchQueryValue = decodeURIComponent(route.split('q=')[1]);
    }
    return {
        isSearchQuery: isSearchQuery,
        query: searchQueryValue
    };
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
  let username = Math.random().toString(36).substring(2, 4) + twoDigits
  username += wordsList[Math.floor(Math.random() * wordsList.length)] = '_'
  username += wordsList[Math.floor(Math.random() * wordsList.length)]
  username += randomNumber
  return username
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
    window.addEventListener('load', callback);
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

export const toHTML = (text: string) => {
  const original_text = text
  let changed_text = text
  // regex to replace all mentions with a link and hashtags with a link and links with only http and https with a link
  const MENTION_REGEX = /(^|\s)(@[a-zA-Z0-9_]+)/g
  const HASHTAG_REGEX = /(^|\s)(#[a-zA-Z0-9_]+)/g
  // link regex domain is optional e.g http(s):web and http(s):web.com are valid
  const valid_domain_prefix = "(http(s)?:\\/\\/|www\\.)"
  const valid_domain_suffix = "(\\.\\w+|\\w+\\.\\w+|\\w+)"
  const LINK_REGEX = new RegExp(`(^|\\s)(${valid_domain_prefix}[a-zA-Z0-9_]+${valid_domain_suffix}(\\/\\S*)?)`, "g")
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
    changed_text = changed_text.replace(LINK_REGEX, (match, p1, p2) => {
      return `${p1}<a href="${p2}" class="text-link">${p2}</a>`
    })
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
