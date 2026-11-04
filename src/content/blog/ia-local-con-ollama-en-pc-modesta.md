---
title: "IA local en tu propia PC con Ollama (sin nube y sin pagar)"
date: 2026-07-23
tags: [tutorial, ia-local, linux]
excerpt: "Instala un asistente de IA que corre en tu máquina, funciona sin internet una vez descargado y puedes usar desde la terminal o desde tus propios scripts."
---

Un modelo de lenguaje no tiene por qué vivir en la nube. Con **Ollama** puedes descargar uno una vez y usarlo después **sin conexión**, sin suscripciones y con tus datos en tu propia PC. Ideal para practicar, resumir textos o automatizar cosas.

## ¿Qué PC necesito?

Como referencia aproximada:

| Modelo | RAM recomendada | Para qué |
| --- | --- | --- |
| `llama3.2:1b` | 4 GB | Pruebas y respuestas cortas |
| `llama3.2:3b` | 8 GB | Mejor calidad en uso diario |

Más memoria y una GPU ayudan, pero un modelo pequeño funciona en un procesador normal; solo irá más lento.

## 1. Instalar Ollama

```bash
# Cualquier distro (instalador oficial)
curl -fsSL https://ollama.com/install.sh | sh

# Arch Linux (desde los repositorios)
sudo pacman -S ollama
sudo systemctl enable --now ollama
```

Comprueba que quedó instalado:

```bash
ollama --version
```

## 2. Descargar y usar un modelo

La descarga requiere internet (el modelo pequeño pesa más o menos 1,3 GB). Solo se hace una vez:

```bash
ollama run llama3.2:1b
```

Se abre un chat en la terminal. Escribe tu pregunta, y para salir usa `/bye`.

Otros comandos útiles:

```bash
ollama list          # modelos descargados
ollama rm llama3.2:1b # borrar un modelo y recuperar espacio
```

## 3. Usarlo desde otros programas

Ollama levanta una API local en el puerto 11434. Desde la terminal:

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2:1b",
  "prompt": "Explica qué es un firewall en dos frases",
  "stream": false
}'
```

Y desde Python, **sin instalar librerías**:

```python
import json
import urllib.request

payload = json.dumps({
    "model": "llama3.2:1b",
    "prompt": "Resume en una línea qué hace rsync",
    "stream": False,
}).encode()

req = urllib.request.Request(
    "http://localhost:11434/api/generate",
    data=payload,
    headers={"Content-Type": "application/json"},
)
with urllib.request.urlopen(req) as respuesta:
    print(json.load(respuesta)["response"])
```

## Trucos para conexiones limitadas

- Descarga el modelo donde tengas buena conexión y llévalo a otra PC. Si Ollama corre como servicio del sistema, los modelos suelen estar en `/usr/share/ollama/.ollama/models`; si lo ejecutas como usuario, en `~/.ollama/models`.
- Después de la descarga, todo funciona **sin internet**.

## Cosas que conviene saber

- Los modelos pequeños se equivocan y se inventan datos. Úsalos como ayuda, no como verdad absoluta.
- Tu información no sale de tu máquina, lo que es una gran ventaja para documentos privados.

¿Quieres un asistente local instalado y afinado para tu negocio o equipo? Es uno de los servicios que ofrezco; escríbeme y lo hablamos.
