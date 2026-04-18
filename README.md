# Sistema Unificado de Gestão e Monitoramento 🚀

Um sistema modular de produtividade e foco extremo, projetado para monitorar atividades em tempo real, priorizar demandas com inteligência artificial e manter a consistência através de gamificação.

## Visão Geral do Projeto
Este projeto integra três pilares principais: monitoramento não intrusivo (mas rigoroso) do que o usuário está fazendo no computador, um núcleo de inteligência artificial que organiza tarefas, e uma interface gamificada baseada em penalidades e recompensas que garante a execução do que foi planejado.

## Arquitetura de 3 Pacotes

O projeto adota uma estrutura em **Monorepo**, dividida nos seguintes pacotes:

### 📦 Package 1: Captura (Monitoramento e Intervenção)
Responsável por atuar no nível do Sistema Operacional.
- **Monitoramento Local:** Rastreia janelas ativas, tempo de uso de softwares e detecta distrações (ex: redes sociais).
- **Bloqueio Ativo:** Capacidade de bloquear a execução de aplicativos proibidos em horários de foco profundo.
- **Scan de Plataformas Externas:** Integração básica ou leitura de uso do navegador para entender em quais sites o tempo está sendo gasto.
- *Stack Proposta:* Python (psutil, pywin32, pygetwindow).

### 🧠 Package 2: Núcleo de Inteligência (Core & AI)
O cérebro da operação, processa os dados e gerencia as regras de negócio.
- **Método Eisenhower API:** Motor de priorização de tarefas baseado em Importância x Urgência.
- **Task Breakdown (IA):** Integração com LLMs para pegar uma "Macro Tarefa" e quebrá-la em micro-passos acionáveis.
- **Modo Foco & Pomodoro:** Gerencia o estado atual do usuário, disparando eventos quando um Pomodoro inicia/termina.
- **Gamificação:** Sistema interno de pontuação (XP), controle de nível e desbloqueio de recompensas (ou aplicação de punições).
- *Stack Proposta:* Python, FastAPI, SQLAlchemy, PostgreSQL, LangChain.

### 💻 Package 3: Interface e Controle (Front-end & Bots)
Onde o usuário interage e recebe o feedback de suas ações.
- **Dashboard Web:** Painel de controle detalhando consistência, árvore de tarefas e relatórios de produtividade.
- **Bots de Monitoramento:** Integrações via Telegram/Discord que enviam pushes, alertas ("Saia do YouTube agora!") e resumos de performance.
- *Stack Proposta:* TypeScript, Next.js (React), TailwindCSS, Python (aiogram).

## Roadmap de Implementação

- [ ] **Fase 1: Fundação**
  - Setup do monorepo e infraestrutura de CI/CD.
  - Implementação básica do CRUD de Tarefas e Entidades no Núcleo (Package 2).
- [ ] **Fase 2: Captura e Foco**
  - Desenvolvimento do serviço de background (Package 1) para leitura de processos ativos.
  - Implementação do timer Pomodoro e Modo Foco integrado ao banco de dados.
- [ ] **Fase 3: Inteligência Artificial**
  - Integração de LLM para categorização automática na Matriz de Eisenhower e quebra de tarefas.
- [ ] **Fase 4: Gamificação e Interface**
  - Construção do Dashboard (Next.js) para visualização em tempo real (Package 3).
  - Criação do Bot de Alertas para intervenções diretas.
- [ ] **Fase 5: Bloqueios e Refinamento**
  - Deploy da feature de bloqueio ativo no SO durante sessões de foco profundo.
