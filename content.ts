import { channelsToHideTheContentFrom } from "./constants";
import { getChannelHandleFromUrl, throttle } from "./helpers";

enum SELECTORS {
  VIDEO_CARD_WRAPPER_ID = '#dismissible',
  CHANNEL_NAME_ID = '#channel-name',
  CHANNEL_NAME_ANCHOR = 'a',
  CHANNEL_NAME_HREF_VALUE = 'href',
  VIDEO_TITLE_ID = '#video-title',
  VIDEO_DESCRIPTION_CLASS = '.metadata-snippet-text',
  HIDDEN = 'hidden'
};

function hideVideoTitles() {
  const videos: NodeListOf<Element> = document.querySelectorAll(SELECTORS.VIDEO_CARD_WRAPPER_ID);

  videos.forEach((video: Element) => {
    const channelNameElement = video.querySelector(SELECTORS.CHANNEL_NAME_ID);
    const anchorTag = channelNameElement?.querySelector(SELECTORS.CHANNEL_NAME_ANCHOR);
    const hrefValue = anchorTag?.getAttribute(SELECTORS.CHANNEL_NAME_HREF_VALUE);

    if (channelNameElement && hrefValue && channelsToHideTheContentFrom.includes(hrefValue?.replace('/', ''))) {
      const description = video.querySelector<HTMLElement>(SELECTORS.VIDEO_DESCRIPTION_CLASS);

      const videoTitleElement = video.querySelector<HTMLElement>(SELECTORS.VIDEO_TITLE_ID);

      if (videoTitleElement) {
        videoTitleElement.style.visibility = SELECTORS.HIDDEN;
      }

      if (description) {
        description.style.visibility = SELECTORS.HIDDEN;
      }
    }

    const currentChannel = getChannelHandleFromUrl(window.location.href);

    if (currentChannel && channelsToHideTheContentFrom.includes(currentChannel)) {
      const videoTitleElement = video.querySelector<HTMLElement>(SELECTORS.VIDEO_TITLE_ID);

      if (videoTitleElement) {
        videoTitleElement.style.visibility = SELECTORS.HIDDEN;
      }

      const description = video.querySelector<HTMLElement>(SELECTORS.VIDEO_DESCRIPTION_CLASS);

      if (description) {
        description.style.visibility = SELECTORS.HIDDEN;
      }
    }
  });
}

addEventListener("prerenderingchange", () => hideVideoTitles());

document.addEventListener('DOMContentLoaded', () => hideVideoTitles());

window.addEventListener('scroll', () => throttle(hideVideoTitles, 1000));