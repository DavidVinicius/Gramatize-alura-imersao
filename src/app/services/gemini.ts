// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = global?.window && window.localStorage.getItem("GEMINI_KEY");

export async function runChat(type) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 1,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
        ],
    });

    const result = await chat.sendMessage(`Aja como uma API json que devolverá em uma requisição pergunta e respostas sobre gramática.  Você deve devolver pergunta com apenas 1 opção correta. As demais opções deve conter erros notáveis. O usuário te passará uma estrutura { tipo: "${type}" } Você seguira a seguinte estrutura: { pergunta: 'PERGUNTA AQUI' alternativaCorreta: "A", justificativa: "AQUI A JUSTIFICATIVA DA RESPOSTA CORRETA", index: "AQUI O INDEX DA OPCAO CORRETA" alternativs: [{opcao: "OPCAO 1", label: 'A'}, {opcao: "OPCAO 2", label: 'B'}, {opcao: "OPCAO 3", label: 'C'}, {opcao: "OPCAO 4", label: 'D'}] }`);
    const response = result.response;
    const text = response.text().replace("```json", "").replace("```", "")
    return JSON.parse(text);
}