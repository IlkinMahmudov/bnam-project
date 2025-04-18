import os
from groq import Groq

# API açarını əlavə et
client = Groq(api_key="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")  # <- buraya öz açarını yaz

# İstifadəçi sualı
user_input = input("Sual verin: ")

# Modelə sorğu göndər
chat_completion = client.chat.completions.create(
    messages=[
        {"role": "user", "content": user_input}
    ],
    model="llama3-8b-8192"  # Groq LLaMA3 modeli
)

# Cavabı çap et
print("AI Cavabı:", chat_completion.choices[0].message.content)
