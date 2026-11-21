
#!/bin/bash

# Verifica se estamos dentro de um repositório Git
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Erro: este diretório não é um repositório Git."
    exit 1
fi

echo "=================================="
echo "       ENVIO PARA O GITHUB"
echo "=================================="

# 1. Adiciona os arquivos modificados e novos
echo ""
echo "Preparando arquivos..."
git add .

if [ $? -ne 0 ]; then
    echo "Erro ao adicionar arquivos."
    exit 1
fi

# 2. Solicita a mensagem do commit
echo ""
read -p "Digite o título do commit: " mensagem

if [ -z "$mensagem" ]; then
    echo "Erro: o título do commit não pode ficar vazio."
    exit 1
fi

# 3. Cria o commit
git commit -m "$mensagem"

if [ $? -ne 0 ]; then
    echo "Erro ao criar o commit."
    exit 1
fi

# 4. Solicita a branch
echo ""
read -p "Informe a branch [main]: " branch

# Usa main caso o usuário não informe nada
branch=${branch:-main}

# 5. Envia para o GitHub
echo ""
echo "Enviando alterações para a branch '$branch'..."

git push origin "$branch"

if [ $? -eq 0 ]; then
    echo ""
    echo "=================================="
    echo "   Alterações enviadas com sucesso!"
    echo "=================================="
else
    echo ""
    echo "Erro ao enviar alterações para o GitHub."
    exit 1
fi
