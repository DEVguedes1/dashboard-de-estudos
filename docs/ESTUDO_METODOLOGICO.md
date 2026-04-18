# Estudo Metodológico: Eisenhower & Pomodoro no Código

Este documento explica como o "Sistema Unificado de Gestão e Monitoramento" transpõe conceitos clássicos de produtividade para estruturas de dados e regras de negócio de software.

## 1. O Método Eisenhower (Matriz de Priorização)

O Método Eisenhower divide tarefas em 4 quadrantes com base na **Importância** e **Urgência**. No nosso sistema, isso não é apenas uma tag visual, mas um critério ativo de roteamento e notificação.

### Abordagem no Banco de Dados
Cada entidade `Task` possui dois booleanos (ou enums de peso) que alimentam a Matriz:
- `is_important` (Boolean)
- `is_urgent` (Boolean)

### Comportamento do Sistema por Quadrante
- **Q1 (Faça Agora - Importante e Urgente):**
  - *Trigger de Sistema:* Alertas push imediatos via Bot (Package 3). Se uma tarefa Q1 não for iniciada no prazo, o sistema subtrai XP de consistência de forma agressiva.
  - *UI:* Ocupam a "Hot Zone" do Dashboard e bloqueiam o início de tarefas Q3 ou Q4 até serem resolvidas.
- **Q2 (Agende - Importante, mas Não Urgente):**
  - *Trigger de Sistema:* Motor de IA avalia tarefas Q2 grandes e as fragmenta em sub-tarefas para serem encaixadas nas sessões de foco dos próximos dias.
  - *Gamificação:* Completar tarefas Q2 gera o maior volume de XP positivo, pois representa trabalho proativo e planejado.
- **Q3 (Delegue/Minimize - Urgente, mas Não Importante):**
  - *Trigger de Sistema:* Agrupadas em lotes. O sistema sugere "blocos de tempo" específicos (ex: 30 min no fim do dia) para despachá-las rapidamente.
- **Q4 (Elimine - Nem Importante, Nem Urgente):**
  - *Trigger de Sistema:* Geralmente distrações monitoradas pelo *Package 1*. O sistema as intercepta e converte em métricas de "Tempo Desperdiçado", ativando punições se o limite diário for ultrapassado.

---

## 2. A Técnica Pomodoro & Modo Foco

A Técnica Pomodoro (blocos de 25m foco / 5m descanso) é o motor de execução rítmica do sistema. Ela atua como um semáforo de estado global para os 3 pacotes.

### A Máquina de Estados (State Machine)
O Núcleo de Inteligência (Package 2) mantém o "Estado de Foco" atual do usuário:
- `IDLE` (Ocioso)
- `FOCUS_DEEP` (Pomodoro Ativo)
- `REST_SHORT` (Pausa Curta)
- `REST_LONG` (Pausa Longa)

### Integração dos Pacotes com o Estado

1. **Ao ativar o `FOCUS_DEEP` (Via Dashboard ou Bot):**
   - **Package 2:** Inicia a contagem regressiva e vincula o bloco de tempo à Tarefa atual (gerando dados de *Time Tracking* exatos).
   - **Package 1 (Captura):** Recebe um webhook/sinal de "Lockdown". Passa a matar ativamente processos listados em uma blacklist (ex: navegadores em redes sociais, jogos).
   - **Package 3 (Interface):** O Dashboard entra em "Modo Zen" (UI minimalista), e o Bot silencia todas as notificações que não sejam de emergência do sistema.

2. **Ao entrar em `REST_SHORT`:**
   - **Package 1:** Suspende os bloqueios, permitindo navegação livre temporalmente.
   - **Package 3:** Dispara um alerta de áudio ou push: "Descanse os olhos, caminhe por 5 minutos".

3. **Validação de Foco (Anti-Cheat):**
   - Durante o `FOCUS_DEEP`, o Package 1 mede a atividade real (mouse/teclado e janelas em foco). Se o usuário passar mais de X minutos no editor de código e na documentação, ganha bônus de XP. Se o sistema detectar "ausência de movimento produtivo" ou burla de bloqueio, o Pomodoro é invalidado e o XP não é computado.
