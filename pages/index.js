import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import imagempadrao from '../img/imagempadrao.jpg'

function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag> {props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}


export default function PaginaInicial() {
  const [username, setUsername] = React.useState('');
  const rota = useRouter();
  //const [name, userName] = React.useState('');


  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[200],
          backgroundImage: 'url(https://i.postimg.cc/L4nQ0rvP/bobesponja.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.primary[900],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              rota.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              placeholder='Insira seu usário do github'
              onChange={(e) => {
                e.preventDefault();
                setUsername(e.target.value);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.primary[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[600],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[700],
              }}
              disabled={username.length <= 2}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.primary[600],
              border: '1px solid',
              borderColor: appConfig.theme.colors.primary[600],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={username.length > 2 ? `https://github.com/${username}.png` : imagempadrao.src}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username.length > 2 ? username : 'Você é o Bob?'}
            </Text>

          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}