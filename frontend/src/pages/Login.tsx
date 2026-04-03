import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'
import { Lock, LogIn, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <img src="/Logo.svg" alt="Logo" className="h-8" />
      <Card className="w-full">
        <CardHeader className="items-center text-center">
          <CardTitle>Fazer Login</CardTitle>
          <CardDescription>Entre na sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>
                        <Mail />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput id="login-email" placeholder="mail@example.com" />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel htmlFor="login-password">Senha</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>
                        <Lock />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      id="login-password"
                      type="password"
                      placeholder="Digite sua senha"
                    />
                  </InputGroup>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="remember-me" name="remember-me" />
                  <FieldLabel htmlFor="remember-me" className="text-sm font-normal">
                    Lembrar-me
                  </FieldLabel>

                  <Button variant="link" className="cursor-pointer">
                    Recuperar senha
                  </Button>
                </Field>

                <Button type="submit" className="w-full py-3 px-4 h-auto" size="lg">
                  <LogIn />
                  Login
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
            <span className="text-sm text-muted-foreground">Ainda não tem uma conta?</span>
            <Button
              variant="outline"
              className="w-full py-3 px-4 h-auto"
              size="lg"
              onClick={() => navigate('/signup')}
            >
              Criar conta
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
