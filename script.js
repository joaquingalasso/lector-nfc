document.getElementById('leerNFC').addEventListener('click', async () => {
    if ('NDEFReader' in window) {
      try {
        const ndef = new NDEFReader();
        await ndef.scan();
  
        ndef.onreading = event => {
          const decoder = new TextDecoder();
          let message = '';
  
          for (const record of event.message.records) {
            message += `Tipo: ${record.recordType}\n`;
            message += `Datos: ${decoder.decode(record.data)}\n`;
          }
  
          document.getElementById('resultado').textContent = message;
        };
  
        ndef.onreadingerror = () => {
          document.getElementById('resultado').textContent = 'Error al leer la etiqueta NFC.';
        };
      } catch (error) {
        document.getElementById('resultado').textContent = `Error: ${error}`;
      }
    } else {
      document.getElementById('resultado').textContent = 'La API Web NFC no es soportada por este navegador.';
    }
  });
  