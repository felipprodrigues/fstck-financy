import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'
import { gqlRequest } from '@/lib/gql-client'
import { useAuthStore } from '@/store/auth.store'
import { useMutation } from '@tanstack/react-query'
import { Lock, Mail, UserRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import REGISTER_MUTATION from './graphql/register.graphql?raw'

const signupSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z.email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type SignupFormValues = z.infer<typeof signupSchema>

interface RegisterResponse {
  register: {
    token: string
    refreshToken: string
    user: { id: string; name: string; email: string }
  }
}

export function Signup() {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({ mode: 'onBlur' })

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: SignupFormValues) =>
      gqlRequest<RegisterResponse>(REGISTER_MUTATION, { data }),
    onSuccess: ({ register: { token, refreshToken, user } }) => {
      login(token, refreshToken, user)
      navigate('/')
    },
  })

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <img src="/Logo.svg" alt="Logo" className="h-8" />
      <Card className="w-full">
        <CardHeader className="items-center text-center">
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Comece a controlar suas finanças ainda hoje</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((values) => mutate(values))}>
            <div className="flex flex-col gap-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="signup-fullName">Nome completo</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>
                        <UserRound />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      id="signup-fullName"
                      placeholder="Seu nome completo"
                      {...register('name', { required: 'Nome obrigatório' })}
                    />
                  </InputGroup>
                  {errors.name && (
                    <span className="text-xs text-red-500">{errors.name.message}</span>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>
                        <Mail />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      id="signup-email"
                      placeholder="mail@example.com"
                      {...register('email', {
                        validate: (v) =>
                          signupSchema.shape.email.safeParse(v).success || 'Email inválido',
                      })}
                    />
                  </InputGroup>
                  {errors.email && (
                    <span className="text-xs text-red-500">{errors.email.message}</span>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="signup-password">Senha</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>
                        <Lock />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      id="signup-password"
                      type="password"
                      placeholder="Digite sua senha"
                      {...register('password', {
                        minLength: {
                          value: 8,
                          message: 'A senha deve ter no mínimo 8 caracteres',
                        },
                      })}
                    />
                  </InputGroup>
                  {errors.password ? (
                    <span className="text-xs text-red-500">{errors.password.message}</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Sua senha deve ter no mínimo 8 caracteres
                    </span>
                  )}
                </Field>

                {error && (
                  <span className="text-xs text-red-500 text-center">{error.message}</span>
                )}

                <Button
                  type="submit"
                  className="w-full py-3 px-4 h-auto"
                  size="lg"
                  disabled={isPending}
                >
                  {isPending ? 'Criando...' : 'Criar Conta'}
                </Button>
              </FieldGroup>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <div className="flex items-center gap-2 w-full">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">ou</span>
            <Separator className="flex-1" />
          </div>

          <div className="flex flex-col items-center gap-2 w-full">
            <span className="text-sm text-muted-foreground">Já tem uma conta?</span>
            <Button
              variant="outline"
              className="w-full py-3 px-4 h-auto"
              size="lg"
              onClick={() => navigate('/login')}
            >
              Fazer login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
