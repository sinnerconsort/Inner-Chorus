# Inner Chorus 🎭

A SillyTavern extension that creates **dynamic inner voices** inspired by *Slay the Princess*. Unlike fixed personality systems, voices in Inner Chorus **emerge from your choices, deaths, and traumas** - and stick around to argue with each other forever.

## ✨ Core Concept

In *Slay the Princess*, you start with just the **Narrator** and the **Hero**. But as you make choices - as you die in different ways, act on different impulses - new voices awaken. Each voice remembers *why* it exists and colors all future decisions with that memory.

**Inner Chorus brings this system to roleplay:**
- Voices awaken based on what happens in your story
- Each voice has a personality, a bias, and a *memory* of its origin
- They argue with each other, building on and contradicting each other's advice
- Your psyche becomes a living record of your journey

## 🎭 Default Voice Set: Slay the Princess

| Voice | Always Present | Spawns From | Personality |
|-------|---------------|-------------|-------------|
| **The Narrator** | ✓ | - | Objective framing, subtle guidance |
| **The Hero** | ✓ | - | Conscience, heroism, doing what's right |
| **The Broken** | | Pathetic death | Despair, submission, "why struggle?" |
| **The Cheated** | | Stolen victory | Bitter resentment, pessimism |
| **The Cold** | | Heartless choice | Emotional detachment, pragmatism |
| **The Contrarian** | | Nonsensical choice | Chaos, doing the unexpected |
| **The Hunted** | | Fear-driven death | Survival instinct, hypervigilance |
| **The Opportunist** | | Taking advantage | Calculating, always seeing angles |
| **The Paranoid** | | Cowardly choice | Deep suspicion, seeing traps |
| **The Skeptic** | | Radical doubt | Questioning everything, demanding proof |
| **The Smitten** | | Acting on feelings | Love, devotion, following the heart |
| **The Stubborn** | | Fighting to the end | Refusal to yield, defiance |

## 🌟 Features

### Dynamic Voice Spawning
- **Auto-Detection**: The system reads narrative for death, trauma, and major choice keywords
- **Contextual Memory**: Each awakened voice remembers what spawned it
- **Toast Notifications**: *"The Broken has awakened..."* when a new voice emerges

### Reactive Chorus
- One API call generates all voices interacting together
- Voices argue, agree, interrupt, and reference each other
- The Narrator frames; others react with their biases

### Voice Management
- See all voices (awake and dormant)
- Manually awaken or silence voices
- View each voice's origin memory

### Future Features (Planned)
- Custom voice sets
- Per-character/persona voice profiles
- Voice creation wizard
- Lorebook integration for voice spawning

## Installation

1. Open SillyTavern
2. Go to **Extensions** → **Install Extension**
3. Paste the GitHub URL or install from zip
4. Enable "Inner Chorus" in the extensions list

## Setup

1. Click the **💬 chat bubble** FAB to open the panel
2. Go to **Settings** tab
3. Configure your API (OpenAI-compatible endpoint)
4. Adjust voice counts and behavior
5. **Save Settings**

## How Voices Spawn

When a message contains multiple keywords matching a voice's spawn condition, that voice awakens. For example:

**The Broken** awakens when the narrative contains words like:
- "pathetic", "gave up", "surrender", "collapsed", "helpless"

**The Smitten** awakens when you see:
- "love", "devoted", "feelings", "heart", "romance"

You need **2+ keyword matches** for a voice to spawn automatically.

## Voice Memory

Each voice remembers why it exists:

> **The Cheated**: *"I had it. I HAD it. And it was ripped away. Never again. Never trust that things will work out."*

> **The Stubborn**: *"I remember refusing to give up. I died fighting. That's the only death worth having."*

These memories color how the voice reacts to everything that follows.

## Tips

- **Start simple**: Begin with just Narrator and Hero, let others emerge naturally
- **Manual awakening**: If you want a specific voice, you can manually awaken it
- **Silence when needed**: If a voice becomes annoying, silence it (except Narrator)
- **Higher max tokens**: Voices interacting need room - try 600-800 tokens

## Roadmap

- [ ] Voice Set editor (create your own voice systems)
- [ ] Per-persona voice profiles
- [ ] Lorebook-triggered spawning
- [ ] Voice relationship tracking
- [ ] Import/export voice sets

## Credits

- Inspired by **Slay the Princess** by Black Tabby Games
- Built for **SillyTavern**
- Extension by **Judas**

---

*"There are so many of us now. There isn't supposed to be this many."*
