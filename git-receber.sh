#!/bin/bash
set -e

git fetch origin
git reset --hard origin/main

echo "Atualização concluída com sucesso!"