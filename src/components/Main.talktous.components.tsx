import { FormEvent, useRef, useState } from "react";
import validator from "validator";
import EmailSendComponent from "./Main.emailSend.components";
export default function TalkToUse() {
  const emailRef = useRef<any>();
  const contentRef = useRef<any>();
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();
  function handleForm(e: FormEvent) {
    e.preventDefault();
    const input1 = emailRef.current;
    const input2 = contentRef.current;

    if (!input1 || !input2) {
       setError('Não foi possivel enviar o email');
       setSuccess(null);
        return;
    }

    if (!input1.value || !input2.value) {
      setError('Preencha os campos primeiro');
      setSuccess(null);
        return;
    }

    if (!validator.isEmail(input1.value)) {
      setError('O Email fornecido é inválido');
      setSuccess(null);
        return;
    }

    const dados = {
        email: input1.value,
        message: input2.value,
    };

    fetch('https://formspree.io/f/mknldozn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => {
        if (response.ok) {
           setSuccess('Email enviado com sucesso');
           setError(null);
            input1.value  = '';
            input2.value = '';
        } else {
          setError('Não foi possivel enviar o email');
        }
    })
    .catch(error => {
      setError('Não foi possivel enviar o email');
    });
  }
    return (
      <div className="h-auto bg-gradient-to-r from-gray-800 to-gray-900 py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-white font-bold text-4xl mb-4">Fale Conosco</h1>
          <p className="text-gray-400 text-lg mb-8">
            Tem dúvidas ou sugestões? Envie-nos um email e responderemos o mais rápido possível!
          </p>
  
          <form onSubmit={handleForm} className="space-y-4">
            <input
            ref={emailRef}
              type="email"
              placeholder="Seu email"
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
            ref={contentRef}
              placeholder="Escreva sua mensagem"
              rows={4}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all duration-300"
            >
              Enviar Mensagem
            </button>
            {error ? <EmailSendComponent type={true} message={error}/> : null}
            {success ? <EmailSendComponent type={false} message={success}/> : null}
          </form>
        </div>
      </div>
    );
  }
  