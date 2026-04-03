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
import { Lock, Mail, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Signup() {
  const navigate = useNavigate()

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <img src="/Logo.svg" alt="Logo" className="h-8" />
      <Card className="w-full">
        <CardHeader className="items-center text-center">
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Comece a controlar suas finanças ainda hoje</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
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
                    <InputGroupInput id="signup-fullName" placeholder="Seu nome completo" />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>
                        <Mail />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput id="signup-email" placeholder="mail@example.com" />
                  </InputGroup>
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
                    />
                  </InputGroup>
                  <span className="text-xs text-muted-foreground">
                    Sua senha deve ter no mínimo 8 caracteres
                  </span>
                </Field>

                <Button type="submit" className="w-full py-3 px-4 h-auto" size="lg">
                  Criar conta
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
