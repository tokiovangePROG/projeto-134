$(document).ready(function(){

    console.log('Ready')

    //  Busque a data atual e atualize-a no DOM
    let currentDate = new Date();
    $('#currentDate').text(currentDate.toLocaleDateString());

    // Escreva um evento, quando o botão Enviar for clicado
    $('#submitButton').click(function(){

        //  Obtenha o valor do texto da área de texto usando o método 'val()'
        let text_value = $('#textInput').val();

        //  Converta-o em um objeto JS.
        //  Forneça uma "chave" aqui e escreva o mesmo no arquivo app.py também para extrair dados
        let input_text = {'user_input': text_value};
        console.log(input_text);

        //  requisição ajax
        $.ajax({

            //  tipo da requisição web
            type: 'POST',

            //  URL do servidor que vai processar os dados (exemplo)
            url: '/processar_dados',

            //  dados a serem enviados no formato JSON
            data: JSON.stringify(input_text),

            //  o tipo de resposta esperado é json
            dataType: 'json',

            //  contentType
            contentType: 'application/json',

            //  se tudo funcionar, execute esta função
            success: function(result){

                // extraia previsão e a URL do emoticon do resultado
                let prediction = result.prediction;
                let emoticonUrl = result.emoticonUrl;

                //  atualize os elementos DOM
                $('#prediction').text(prediction);
                $('#emoticon').attr('src', emoticonUrl);

                //  exiba-os
                $('#result').show();
            },

            //  se houver algum erro, execute esta função
            error: function(result){

                console.log(result);
            }
        });

        //  limpando a caixa de texto após cada pressionamento de botão
        $('#textInput').val("");
    });
});