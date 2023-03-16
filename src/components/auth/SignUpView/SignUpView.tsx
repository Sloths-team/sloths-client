import { FC, useEffect, useState, useMemo } from 'react'
import Input from '@components/ui/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import s from '../LoginView/LoginView.module.css'
import Button from '../../ui/Button'
import Link from 'next/link'
import { TfiFaceSmile, TfiEmail, TfiLock } from 'react-icons/tfi'
import cn from 'clsx'
import { VscGithubInverted } from 'react-icons/vsc'
import { useSession } from '../../common/Layout/context'
import { BASE_API_URL } from '@lib/constants'
import { AUTH_TOKEN_KEY } from '../../../lib/constants'
import { RiCheckboxCircleFill } from 'react-icons/ri'

type Form = {
  nickname: string
  email: string
  password: string
  passwordCheck: string
}

export const validateNickname = (value: string = '') =>
  /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{1,16}$/.test(value)

export const validateEmail = (value: string = '') =>
  /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)

export const validatePassword = (value: string = '') =>
  /^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*()_+|~\-=\\`{}[\]:";'<>?,./])[a-zA-Z0-9!@#$%^&*()_+|~\-=\\`{}[\]:";'<>?,./]{8,}$/.test(
    value
  )

const SignupView: FC = () => {
  const schema = yup.object({
    nickname: yup
      .string()
      .test(
        'validation',
        '영어, 숫자, 한글 중 1자 이상 16자 이하',
        validateNickname
      ),
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
    passwordCheck: yup
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
    setError,
    formState: { isValid, errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: { nickname: '', email: '', password: '', passwordCheck: '' },
    mode: 'onChange',
  })

  const { nickname, email, password, passwordCheck } = watch()
  const [disabled, setDisabled] = useState(true)
  const [moveToEmailConfirm, setMoveToEmailConfirm] = useState(false)
  const passwordConfirmed =
    !errors.password && !errors.passwordCheck && password === passwordCheck

  const [fullDomain, domainName] = useMemo(() => {
    const fullMatch = email.match(/@(.+)$/)
    const nameMatch = email.match(/@([^.]+)/)

    if (fullMatch && nameMatch) {
      const full = fullMatch[1]
      const name = nameMatch[1]

      return [full, name[0].toUpperCase() + name.slice(1)]
    }

    return []
  }, [email])

  const signup = useSession().signup()

  const onSignup = (data: Form) => {
    signup.mutateAsync(data, {
      onSuccess: (data) => {
        if (!data.isSuccess) {
          setError('email', { message: '이미 사용중인 이메일입니다.' })
          setFocus('email')
          return
        }
        setMoveToEmailConfirm(true)
      },
    })
  }

  useEffect(() => {
    setDisabled(!isValid || !passwordConfirmed)
  }, [isValid, passwordConfirmed])

  useEffect(() => {
    setFocus('nickname')
  }, [])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>회원가입</h1>
        <Link href="/login" className={s.link}>
          로그인으로 이동하기
        </Link>
      </div>
      {moveToEmailConfirm && (
        <div className={s.email_confirm}>
          <p>
            <RiCheckboxCircleFill />
            <span className={s.email_confirm__text}>
              이메일로 전송된 링크로 인증을 완료해주세요.
            </span>
          </p>
          <a href={`https://${fullDomain}`}>{domainName}로 이동하기 </a>
        </div>
      )}
      <form onSubmit={handleSubmit(onSignup)}>
        <label className={s.input_container}>
          <span className={s.label}>닉이름</span>
          <div className={s.input_wrapper}>
            <div
              className={cn(s.icon, {
                [s.default]: !nickname.length,
                [s.valid]: !!nickname && !errors.nickname,
                [s.invalid]: nickname.length && errors.nickname,
              })}
            >
              <TfiFaceSmile />
            </div>
            <Input
              control={control}
              name="nickname"
              placeholder="이름을 입력해 주세요"
            />
          </div>
        </label>
        <label className={s.input_container}>
          <span className={s.label}>이메일</span>
          <div className={s.input_wrapper}>
            <div
              className={cn(s.icon, {
                [s.default]: !email.length,
                [s.valid]: !!email && !errors.email,
                [s.invalid]: email.length && errors.email,
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
        <label className={s.input_container} style={{ marginBottom: 10 }}>
          <span className={s.label}>비밀번호</span>
          <div className={s.input_wrapper}>
            <div
              className={cn(s.icon, {
                [s.default]: !password.length,
                [s.valid]: !!password && !errors.password,
                [s.invalid]: password.length && errors.password,
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
        <label className={s.input_container}>
          <div className={s.input_wrapper}>
            <div
              className={cn(s.icon, {
                [s.default]: !passwordCheck,
                [s.valid]: !!passwordCheck,
                [s.invalid]:
                  !!password && !!passwordCheck && password !== passwordCheck,
              })}
            >
              <TfiLock />
            </div>
            <Input
              type="password"
              control={control}
              name="passwordCheck"
              placeholder="비밀번호를 확인해 주세요"
            />
          </div>
        </label>
        <div className={s.button_wrapper}>
          <Button type="submit" disabled={disabled}>
            회원가입
          </Button>
          {errors?.email?.message && (
            <p className={s.error}>{errors?.email?.message}</p>
          )}
        </div>
      </form>

      <div className={s.socials}>
        <span>또는</span>
        <Button type="button" className={s.github}>
          <a href={`${BASE_API_URL}/api/auth/github`}>
            <VscGithubInverted />
            깃헙 계정으로 회원가입 하기
          </a>
        </Button>
      </div>
    </div>
  )
}

export default SignupView
