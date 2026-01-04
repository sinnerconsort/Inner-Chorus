# Inner Chorus 🎭

**Dynamic inner voices for SillyTavern** - inspired by *Slay the Princess* and *Disco Elysium*.

Your character's psyche becomes a chorus of voices that comment, argue, and evolve based on what happens in the story.

## ✨ Features

### 🎭 Voice System
- **Dynamic voices** that respond to story events
- **Narrator** provides poetic scene-setting
- **Personality voices** argue and debate about choices
- Voices can be **awakened/silenced** on demand
- Full **customization** of voice personalities

### 🧠 Generate from Persona
- Scan your **persona description** and **lorebook**
- AI creates a **custom voice set** tailored to your character's psychology
- Choose how many voices (3/5/7)
- Choose starting state (all dormant, narrator only, core voices, all active)
- Start fresh or add to existing voices

### 🔮 Context-Aware Spawning
- AI analyzes **who your character is** and **how they react**
- Same event → different characters → different (or no) voices
- Considers persona, lorebook, recent story, and user's reaction
- Can create **brand new voices** tailored to specific moments
- ⚠️ Uses additional API calls per message

### 📚 Voice Management
- **Remove** individual voices from your set
- **Voice Library** to add back removed default voices
- **Clear All** to start with empty template
- **Reset** to restore defaults

### 👤 Persona Profiles
- Save your entire voice configuration per character
- Load profiles to restore voices, memories, and settings
- Update profiles as your character evolves

### 📤 Export / Import
- **Export All** - Download complete backup (all profiles)
- **Copy Current** - Copy current voice set to clipboard (for sharing)
- **Import** - Load profiles or voice sets from JSON files

### ✨ Voice Creator
- **Generate from description**: "A paranoid voice born from betrayal..."
- **Manual editor** for full control
- **Preview** before saving

## Installation

1. Download the latest release
2. Extract to `SillyTavern/data/default-user/extensions/inner-chorus/`
3. Enable in Extensions menu
4. Configure API settings (requires separate LLM endpoint)

## Configuration

### API Settings
- **Endpoint**: Your LLM API endpoint (OpenAI-compatible)
- **API Key**: Your API key
- **Model**: Model to use for voice generation

### Trigger Settings
- **Auto-trigger**: Automatically generate chorus after AI messages
- **Trigger Delay**: Wait time for streaming to complete (default 1500ms)
- **Auto-spawn**: Basic keyword-based voice spawning
- **Context-aware spawning**: AI analyzes persona + context (⚠️ extra API calls)

### Character Context
- **POV Style**: Second/third/first person
- **Character Name**: For third-person references
- **Character Context**: Who is this character? (Enhances contextual spawning)

## Voice Badges

| Badge | Meaning |
|-------|---------|
| **Always** | Voice is always present (like Narrator) |
| **Core** | Central personality voice (from persona generation) |
| **Persona** | Generated from persona analysis |
| **Story** | Spawned from story events |

## Workflow Tips

1. **Start Fresh**: Use "Generate from Persona" for a custom voice set
2. **Organic Growth**: Set voices to dormant, let them awaken naturally  
3. **Save Profiles**: Save your setup before major story events
4. **Character Context**: More detail = smarter contextual spawning
5. **Share Voice Sets**: Use "Copy Current" to share with others

## Default Voice Set

| Voice | Spawns From |
|-------|-------------|
| The Narrator | Always present |
| The Hero | Always present |
| The Broken | Pathetic death, despair |
| The Cheated | Stolen victory |
| The Cold | Heartless choice |
| The Contrarian | Nonsensical choice |
| The Hunted | Fear-driven death |
| The Opportunist | Taking advantage |
| The Paranoid | Cowardly choice |
| The Skeptic | Radical doubt |
| The Smitten | Acting on feelings |
| The Stubborn | Fighting to the end |

## Credits

Inspired by:
- **Slay the Princess** - The voice system and emergence mechanic
- **Disco Elysium** - Skills as internal voices with personalities

Created by Judas for SillyTavern.

---

*"There are so many of us now. There isn't supposed to be this many."*
