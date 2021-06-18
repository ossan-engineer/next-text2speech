import { useState, useEffect } from 'react'
import Head from 'next/head'
import {
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core'

const Home: React.FC = () => {
  const [text, setText] = useState('')
  const [lang, setLang] = useState('')
  const [voice, setVoice] = useState('')

  if (!process.browser) {
    return null
  }

  const utterance = new SpeechSynthesisUtterance(text)
  const speechSynthesisVoices = speechSynthesis
    .getVoices()
    .filter((speechSynthesisVoice) => speechSynthesisVoice.lang === lang)

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleChangeLang = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLang(event.target.value as string)
  }

  const handleChangeVoice = (event: React.ChangeEvent<{ value: unknown }>) => {
    setVoice(event.target.value as string)
  }

  const handleSpeech = () => {
    utterance.text = text
    utterance.lang = lang
    utterance.voice =
      speechSynthesisVoices.find(
        (speechSynthesisVoice) => speechSynthesisVoice.name === voice
      ) || null
    speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    setLang('ja-JP')
  }, [])

  // useEffect(() => {
  //   setVoice(
  //     speechSynthesisVoices.find(
  //       (speechSynthesisVoice) => speechSynthesisVoice.lang === lang
  //     )?.name || ''
  //   )
  // }, [lang, text])

  return (
    <>
      <Head>
        <title>Next Text 2 Speech</title>
        <meta property="og:title" content="Next Text 2 Speech" key="title" />
      </Head>
      <Box maxWidth="500px" marginX="auto" mt="30px">
        <Box mb="15px">
          <TextField
            multiline
            rows={4}
            variant="outlined"
            placeholder="日本語または英語の文章を入力してください。"
            fullWidth
            value={text}
            onChange={handleChangeText}
          ></TextField>
        </Box>
        <Box mb="15px">
          <InputLabel shrink>読み上げに使用する言語</InputLabel>
          <Select fullWidth value={lang} onChange={handleChangeLang}>
            <MenuItem value="ja-JP">日本語</MenuItem>
            <MenuItem value="en-US">英語</MenuItem>
          </Select>
        </Box>
        <Box mb="15px">
          <InputLabel shrink>読み上げに使用する声色</InputLabel>
          <Select
            fullWidth
            value={voice}
            onChange={handleChangeVoice}
            displayEmpty
          >
            <MenuItem value="">デフォルト</MenuItem>
            {speechSynthesisVoices.map((voice) => (
              <MenuItem
                key={voice.name}
                value={voice.name}
              >{`${voice.name} (${voice.lang})`}</MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            fullWidth
            onClick={handleSpeech}
          >
            文章を読み上げる
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Home
