import { Box, Button, Text, Image } from '@skynexui/components';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import img404 from '../img/erro.jpg';

export default function Pag404() {
  const root = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          backgroundColor: appConfig.theme.colors.neutrals['000'],
        }}
      >

        <Text styleSheet={{
          fontSize: '1.8rem',
          fontWeight: '600',
          color: appConfig.theme.colors.neutrals[200]
        }}>ERROR</Text>

        <Image
          styleSheet={{
            maxHeight: { xs: '40vh', sm: '50vh' },
            padding: { xs: '20px 30px', sm: '5px 5px' }
          }}
          src={img404.src}
        />

        <Text styleSheet={{ fontSize: { xs: '18px', sm: '25px' }, fontWeight: '600', margin: '2% 2% 1%', color: appConfig.theme.colors.neutrals[800] }}>
          Página não encontrada!
        </Text>

        <Text styleSheet={{ fontSize: { xs: '12px', sm: '18px' }, textAlign: 'center', margin: '0% 2% 2%', color: appConfig.theme.colors.neutrals[300] }}>
          Tentaremos resolver o mais ráprido possível.
        </Text>

        <Button
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["000"],
            mainColor: appConfig.theme.colors.primary[800],
            mainColorLight: appConfig.theme.colors.primary[400],
            mainColorStrong: appConfig.theme.colors.primary[700],
          }}
          label="Home"
          variant="secondary"
          rounded="sm"
          size="lg"
          styleSheet={{
            hover: {
              cursor: 'pointer'
            },
            margin: { xs: '10%', sm: '2%' },
          }}
          onClick={() => root.push("/")}
        />
      </Box>
    </>
  )
}


