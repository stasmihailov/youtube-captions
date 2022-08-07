const rp = require('request-promise');
const cheerio = require('cheerio');

const findDataScript = (scripts, $) => {
  for (const script of scripts) {
    const text = $(script).text();
    const isCaptionsScript = text.startsWith('var ytInitialPlayerResponse');

    if (isCaptionsScript) {
      const toRemove = 'var ytInitialPlayerResponse = ';
      return text.replace(toRemove, '').replace(/;$/, '');
    }
  }
}

const youtubeRegex = /^https:\/\/www.youtube.com\/watch\?v=[A-Za-z0-9_-]+$/;

const getDataScript = async (videoLink) => {
  if (!youtubeRegex.test(videoLink)) {
    return Promise.reject(`url ${videoLink} doesn't match youtube regex`);
  }

  const url = `${videoLink}&bpctr=9999999999&has_verified=1`;

  return await rp(url)
    .then(html => cheerio.load(html))
    .then($ => findDataScript($('script'), $));
}

const getCaptionsUrl = data => {
  try {
    return data.captions.playerCaptionsTracklistRenderer.captionTracks[0].baseUrl;
  } catch (e) {
    return null;
  }
};

const getCaptionsText = ($) => {
  return $('text').contents()
    .map((_, el) => $(el).text())
    .get()
    .join(' ');
}

const pullCaptions = async (url) => {
  if (!url) {
    return 'no auto-generated captions for this video ☹️';
  }

  return await rp(url)
    .then(html => cheerio.load(html))
    .then(getCaptionsText);
}

const getCaptions = async (url) => {
  return await getDataScript(url)
    .then(JSON.parse)
    .then(getCaptionsUrl)
    .then(pullCaptions);
}

module.exports = {
  getCaptions,
};
