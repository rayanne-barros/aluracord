import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMzNDU1NywiZXhwIjoxOTU4OTEwNTU3fQ.qNiiKrtnCrZBQiEbQ27W8re_fvccFCthkapUr0ibbEY';
const SUPABASE_URL = 'https://pamsdytbdepcxsksahpb.supabase.co';
// const URL_SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const ANON_KEY_SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', (res) => {
      adicionaMensagem(res.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const rota = useRouter();
  const usuarioLogado = rota.query.username;
  const [mensagem, setMensagem] = React.useState('');
  const [listaMensagem, setListaMensagem] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setListaMensagem(data)
      });
    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      setListaMensagem((valorAtualDaLista) => {
        return [
          novaMensagem,
          ...valorAtualDaLista,
        ]
      });
    });
    return () => {
      subscription.unsubscribe();
    }

  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: usuarioLogado,
      texto: novaMensagem,
    }
    supabaseClient
      .from('mensagens')
      .insert([
        mensagem
      ])
      .then(() => {

        setMensagem('');
      })

    // setMensagem('');
  }

  function handleDeletaMensagem(id) {
    const mensagemFiltrada = setListaMensagem(listaMensagem.filter((mensagem) => {
      return mensagem.id !== id
    }))
    supabaseClient
      .from('mensagens')
      .delete()
      .match({ id: id })
      .then(() => {
        setListaMensagem(mensagemFiltrada);
      })
  }


  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[200],
        backgroundImage: `url(https://i.postimg.cc/L4nQ0rvP/bobesponja.jpg)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '85%',
          maxWidth: '75%',
          maxHeight: '95vh',
          padding: '32px',
          opacity: '0.9',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList mensagens={listaMensagem} deletaMensagem={handleDeletaMensagem} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <TextField
              value={mensagem}
              onChange={(e) => {
                setMensagem(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (mensagem.length !== 0) handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <ButtonSendSticker
              onStickerCick={(sticker) => {
                handleNovaMensagem(`:sticker:${sticker}`)

              }}
            />
            <Button
              label='OK'
              //size='sm'
              styleSheet={{
                padding: '13px 12px',
                borderRadius: '7px',
                marginBottom: '8px',
                marginLeft: '8px',
                backgroundColor: appConfig.theme.colors.primary[900]

              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[600],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[700],
              }}
              onClick={() => {
                if (mensagem.length !== 0) handleNovaMensagem(mensagem);

              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          styleSheet={{
            color: appConfig.theme.colors.neutrals["100"],
          }}
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              fontSize: { xs: '12px', sm: '16px' },
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '2px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box
                styleSheet={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Image
                  styleSheet={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px',
                    hover: {
                      transform: 'scale(2.5)',
                      marginLeft: '25px',
                      marginRight: '25px',
                    }
                  }}
                  src={`https://github.com/${mensagem.de}.png`}
                />
                <Text tag="strong" >
                  {mensagem.de}
                </Text>
                <Text
                  styleSheet={{
                    fontSize: '10px',
                    marginLeft: '8px',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {(new Date().toLocaleDateString())}
                </Text>
              </Box>
              <Box

              >
                <Button
                  onClick={() => {
                    props.deletaMensagem(mensagem.id)
                  }}
                  type='button'
                  label='X'
                  styleSheet={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '7px',
                    backgroundColor: appConfig.theme.colors.primary[900],
                  }}
                  buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["000"],
                    mainColor: appConfig.theme.colors.primary[600],
                    mainColorLight: appConfig.theme.colors.primary[400],
                    mainColorStrong: appConfig.theme.colors.primary[700],
                  }}
                >
                  X

                </Button>

              </Box>
            </Box>
            {/* {mensagem.texto.startsWith(':sticker:').toString()} */}
            {mensagem.texto.startsWith(':sticker:')
              ? (
                <Image src={mensagem.texto.replace(':sticker:', '')} />

              )
              : (
                mensagem.texto
              )}
            {/* {mensagem.texto} */}
          </Text>
        );
      })}
    </Box>
  )
}
