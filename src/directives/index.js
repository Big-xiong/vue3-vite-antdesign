import QRCode from 'qrcodejs2-fix';

export const registerDirectives = (app) => {
  app.directive('qrcode',{
    mounted(el,binding) {
      new QRCode(el, {
        text: binding.value,
      })
    }
  })
}

