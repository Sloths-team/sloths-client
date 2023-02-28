import { FC, useEffect, useState } from 'react'
import Input from '@components/ui/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import s from './LoginView.module.css'
import Button from '../../ui/Button'
import Link from 'next/link'
import { TfiEmail, TfiLock } from 'react-icons/tfi'
import { validateEmail, validatePassword } from '../SignUpView/SignUpView'
import cn from 'clsx'

type Form = {
  email: string
  password: string
}

const LoginView: FC = () => {
  const schema = yup.object({
    email: yup
      .string()
      .test('validation', '@ 포함 & .포함 후 1글자 이상', validateEmail),
    password: yup
      .string()
      .test(
        'validation',
        '영문, 숫자, 특수 문자 중 2개 8글자 이상',
        validatePassword
      ),
  })

  const {
    control,
    handleSubmit,
    setFocus,
    watch,
    formState: { isValid, errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  })

  const { email, password } = watch()
  const [disabled, setDisabled] = useState(true)

  const onLogin = (data: Form) => {
    console.log('>>', data)
  }

  useEffect(() => {
    setFocus('email')
  }, [])

  useEffect(() => {
    setDisabled(!isValid)
  }, [isValid])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>로그인</h1>
        <Link href="/signup" className={s.link}>회원가입으로 이동하기</Link>
      </div>
      <form onSubmit={handleSubmit(onLogin)}>
        <label className={s.input_container}>
          <span className={s.label}>이메일</span>
          <div className={s.input_wrapper}>
            <div
              className={cn(s.icon, {
                [s.default]: !email.length,
                [s.valid]: !!email && !errors.email,
                [s.invalid]: errors.email,
              })}
            >
              <TfiEmail />
            </div>
            <Input
              type="email"
              control={control}
              name="email"
              placeholder="이메일을 입력해 주세요"
            />
          </div>
        </label>
        <label className={s.input_container}>
          <span className={s.label}>비밀번호</span>
          <div className={s.input_wrapper}>
            <div
              className={cn(s.icon, {
                [s.default]: !password.length,
                [s.valid]: !!password && !errors.password,
                [s.invalid]: errors.password,
              })}
            >
              <TfiLock />
            </div>
            <Input
              type="password"
              control={control}
              name="password"
              placeholder="영문자, 숫자, 특수문자 포함 최소 8~20자 "
            />
          </div>
        </label>
        <div className={s.button_wrapper}>
          <Button type="submit" disabled={disabled}>
            로그인
          </Button>
        </div>
      </form>
      <div>
        <Link href="/forgot_password" className={s.link}>비밀번호 찾기</Link>
      </div>
      <div className={s.socials}>
        <span>다른 계정으로 로그인 하기</span>
        <Button type="button">
          <a href="/">Github</a>
        </Button>
      </div>
    </div>
  )
}

export default LoginView
