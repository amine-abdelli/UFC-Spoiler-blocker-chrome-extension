const channelsToHideTheContentFrom = [
  '@ufc', '@RMCSport', '@RMCSportCombat',
  '@lasueuroff', '@LaSueurPlus', '@ESPNMMA',
  '@THEGOATMMABOXING', '@mmafanaticsfr', '@MMAFighterChannel',
  '@clementmarcou', '@FightMinds', '@MMAFightingonSBN',
  '@KhabibTheEagle', '@TheMacLife', '@bisping', '@UFCBR', '@iAmTheBay', '@DC_MMA', '@votesport',
  '@obsessionmmapod', '@mmaweekly'
];

function hideVideoTitles() {
  const videos = document.querySelectorAll('#dismissible');

  videos.forEach(video => {
    const channelNameElement = video.querySelector('#channel-name');
    const anchorTag = channelNameElement?.querySelector('a');
    const hrefValue = anchorTag?.getAttribute('href');

    if (channelNameElement && channelsToHideTheContentFrom.includes(hrefValue?.replace('/', ''))) {
      const description = video.querySelector('.metadata-snippet-text');
      const videoTitleElement = video.querySelector('#video-title');
      if (videoTitleElement) {
        videoTitleElement.style.visibility = 'hidden';
      }

      if (description) {
        description.style.visibility = 'hidden';
      }
    }

    if (channelsToHideTheContentFrom.includes(getChannelHandleFromUrl(window.location.href))) {
      const description = video.querySelector('.metadata-snippet-text');
      const videoTitleElement = video.querySelector('#video-title');
      if (videoTitleElement) {
        videoTitleElement.style.visibility = 'hidden';
      }

      if (description) {
        description.style.visibility = 'hidden';
      }
    }

  });
}

function getChannelHandleFromUrl(url) {
  const regex = /https:\/\/www\.youtube\.com\/(@[a-zA-Z0-9_]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

function observeDOMChanges() {
  const observer = new MutationObserver(throttledHideVideoTitles);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

const throttledHideVideoTitles = throttle(hideVideoTitles, 1000);

addEventListener("prerenderingchange", (event) => {
  hideVideoTitles();
  observeDOMChanges();
});


document.addEventListener('DOMContentLoaded', () => {
  hideVideoTitles();
  observeDOMChanges();
});

window.addEventListener('scroll', throttledHideVideoTitles);