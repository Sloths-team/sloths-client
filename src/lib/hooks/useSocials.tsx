// kakao

const useSocials = () => {
  const url = encodeURI(window.location.href)

  // Facebook
  const shareFacebook = () => {
    window.open('http://www.facebook.com/sharer/sharer.php?u=' + url)
  }

  // Twitter
  const shareTwitter = () => {
    const text = '지금 우리 MBTI는?'
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url)
  }

  return { shareFacebook, shareTwitter }
}

export default useSocials
