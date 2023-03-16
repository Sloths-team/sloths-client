export const url = encodeURI(window.location.href)

// Facebook
export const shareFacebook = () => {
  window.open('http://www.facebook.com/sharer/sharer.php?u=' + url)
}

// Twitter
export const shareTwitter = () => {
  const text = '지금 우리 MBTI는?'
  window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url)
}

// kakao
