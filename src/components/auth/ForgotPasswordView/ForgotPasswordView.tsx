import { FC, useEffect, useState } from 'react'
import Input from '@components/ui/Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import s from '../LoginView/LoginView.module.css'
import Button from '../../ui/Button'
import Link from 'next/link'
import { TfiEmail } from 'react-icons/tfi'
import { validateEmail } from '../SignUpView/SignUpView'
import cn from 'clsx'

type Form = {
  email: string
}

const ForgotPasswordView: FC = () => {
  const schema = yup.object({
    email: yup
      .string()
      .test('validation', '@ 포함 & .포함 후 1글자 이상', validateEmail),
  })

  const {
    control,
    handleSubmit,
    setFocus,
    watch,
    formState: { isValid, errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
    mode: 'onChange',
  })

  const { email } = watch()
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onFindPassword = (data: Form) => {
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
        <h1>비밀번호 찾기</h1>
        <Link href="/login" className={s.link}>
          로그인으로 이동하기
        </Link>
      </div>
      <form onSubmit={handleSubmit(onFindPassword)}>
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
        <div className={s.button_wrapper}>
          <Button type="submit" disabled={disabled}>
            이메일 인증하기
          </Button>
        </div>
      </form>
      {loading && (
        <div className={s.message}>
          이메일로 이동해 인증을 마저 진행해 주세요.
        </div>
      )}
    </div>
  )
}

export default ForgotPasswordView
