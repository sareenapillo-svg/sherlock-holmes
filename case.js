/**
 * Azure Alibi - Case Data & Central State Store
 * Phase 1: Case data definition, state store with localStorage persistence,
 * and clue-to-suspect connection logic.
 */

window.CASE_DATA = {
  title: "AZURE ALIBI",
  caseCode: "CASE FILE 01 · THE MISSING SAPPHIRE",
  tagline: "A valuable sapphire was stolen at a party. Five suspects. Each with an alibi and one clue.",
  briefing: {
    title: "THE MISSING SAPPHIRE AT STERLING MANOR",
    date: "OCTOBER 14, 1890 · MAYFAIR, LONDON",
    summary: "During an opulent evening gala at Sterling Manor, the legendary Azure Sapphire vanished from its velvet cabinet in the private vault gallery between 9:30 PM and 10:00 PM. Five prominent guests were present in the gallery wing, each presenting an alibi for the crucial window.",
    objectives: [
      "Examine the 5 line-art clues discovered at the crime scene.",
      "Inspect the 5 suspect profiles and analyze their alibis.",
      "Connect each clue to its corresponding suspect on the Case Board.",
      "Track case progress from OPEN to IN PROGRESS and SOLVED."
    ]
  },
  suspects: [
    {
      id: "suspect1",
      name: "Prof. James Moriarty",
      role: "Mathematics Chair",
      prop: "High forehead & long coat",
      alibi: "Claims he was discussing topology in the conservatory with Lord Sterling from 9:30 to 10:00 PM.",
      associatedClueId: "clue1"
    },
    {
      id: "suspect2",
      name: "Irene Adler",
      role: "Opera Prima Donna",
      prop: "Silk lace shawl",
      alibi: "Claims she was performing an aria in the grand parlor until 9:45 PM.",
      associatedClueId: "clue2"
    },
    {
      id: "suspect3",
      name: "Col. Sebastian Moran",
      role: "Retired Officer",
      prop: "Military collar",
      alibi: "Claims he was smoking on the terrace overlooking the west garden at 9:40 PM.",
      associatedClueId: "clue3"
    },
    {
      id: "suspect4",
      name: "Charles Milverton",
      role: "High-Society Publisher",
      prop: "Gold monocle & seal ring",
      alibi: "Claims he was reviewing private ledger documents alone in the library.",
      associatedClueId: "clue4"
    },
    {
      id: "suspect5",
      name: "Dr. Grimesby Roylott",
      role: "Physician & Traveller",
      prop: "Top hat & medical bag",
      alibi: "Claims he was attending to a fainting guest in the drawing room at 9:40 PM.",
      associatedClueId: "clue5"
    }
  ],
  clues: [
    {
      id: "clue1",
      title: "Champagne Flute",
      subtitle: "CLUE 01 / EVIDENCE",
      description: "A fine crystal champagne glass found near the vault threshold bearing a faint lipstick smudge.",
      suspectId: "suspect1",
      meaning: "Left near the vault door by Moriarty to frame Irene Adler; contained trace sedatives."
    },
    {
      id: "clue2",
      title: "Torn Silk Glove",
      subtitle: "CLUE 02 / EVIDENCE",
      description: "A torn silk evening glove fragment caught in the brass latch mechanism of the parlor wing.",
      suspectId: "suspect2",
      meaning: "Torn while Irene escaped an overbearing guest in the parlor hallway, completely unrelated to the vault."
    },
    {
      id: "clue3",
      title: "Small Brass Key",
      subtitle: "CLUE 03 / EVIDENCE",
      description: "A miniature ornate brass key dropped near the terrace doors, matching a private gun case.",
      suspectId: "suspect3",
      meaning: "Belongs to Col. Moran's hunting case; dropped while he stepped out to smoke on the garden terrace."
    },
    {
      id: "clue4",
      title: "Torn Guest List",
      subtitle: "CLUE 04 / EVIDENCE",
      description: "A torn paper scrap from the guest register with crossed-out names and cryptic handwritten Vault notes.",
      suspectId: "suspect4",
      meaning: "Milverton's blackmail notes on guests, written while reviewing ledgers in the private library."
    },
    {
      id: "clue5",
      title: "Stopped Watch",
      subtitle: "CLUE 05 / EVIDENCE",
      description: "A heavy silver pocket watch with its hands stopped precisely at 9:40 PM, found under the lounge sofa.",
      suspectId: "suspect5",
      meaning: "Fell from Dr. Roylott's waistcoat while attending to a fainting guest in the drawing room."
    }
  ],
  timeline: [
    {
      time: "8:30 PM",
      title: "Gala Reception Begins",
      location: "Grand Parlor",
      desc: "Guests arrive at Sterling Manor for the autumn evening gala. Five primary guests enter the gallery wing."
    },
    {
      time: "9:08 PM",
      title: "Duplicate Vault Key Signed",
      location: "Security Desk",
      desc: "The duplicate vault key register is signed under a pseudonym using unique mathematical shorthand. (Key Evidence)"
    },
    {
      time: "9:30 PM",
      title: "Vault Cabinet Verified Locked",
      location: "Vault Gallery",
      desc: "Gallery guard confirms the Azure Sapphire is locked safely inside the velvet display cabinet."
    },
    {
      time: "9:40 PM",
      title: "Pocket Watch Stopped & Theft Window",
      location: "Vault Wing Lounge",
      desc: "Silver watch stops at 9:40 PM during 10-minute guard shift change. Theft occurs in this window."
    },
    {
      time: "9:45 PM",
      title: "Guest Alibi Activities",
      location: "Manor Wing",
      desc: "Irene Adler sings aria; Moran smokes on terrace; Milverton reads ledgers; Roylott aids fainting guest."
    },
    {
      time: "10:00 PM",
      title: "Vault Alarm Raised",
      location: "Vault Gallery",
      desc: "Guard discovers velvet cabinet unlocked and empty. Azure Sapphire declared stolen."
    }
  ],
  culpritReveal: {
    culpritId: "suspect1",
    title: "PROFESSOR JAMES MORIARTY IS THE CULPRIT",
    summary: "Moriarty claimed he never left Lord Sterling's sight in the conservatory between 9:30 PM and 10:00 PM. However, police logs reveal the duplicate vault key register was signed at 9:08 PM with his mathematical shorthand. He unlocked the display cabinet earlier, returned during the 9:40 PM shift change, and extracted the Azure Sapphire while Lord Sterling stepped out briefly.",
    redHerrings: [
      {
        suspect: "Irene Adler",
        detail: "Her torn blue silk glove scrap was snagged on a parlor door latch escaping an annoying admirer, not the jewel cabinet."
      },
      {
        suspect: "Col. Sebastian Moran",
        detail: "His small brass key and muddy boot prints belonged to his private gun-case on the damp west garden terrace."
      },
      {
        suspect: "Charles Milverton",
        detail: "His torn guest list and sealing wax were left while sealing blackmail documents in the private library."
      },
      {
        suspect: "Dr. Grimesby Roylott",
        detail: "His stopped pocket watch and botanical soil fell while rendering emergency medical aid to a fainting guest."
      }
    ]
  }
};

/**
 * Central State Store with LocalStorage Persistence
 */
class CaseStateStore {
  constructor() {
    this.STORAGE_KEY = "azure_alibi_case_state_v1";
    this.listeners = [];
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    const defaultState = {
      currentScreen: "hero",
      inspectedClues: [],
      connections: [], // Array of { clueId, suspectId }
      clueVerdicts: {}, // Object mapping clueId -> "NOT_ASSESSED" | "SUPPORTS" | "CONTRADICTS" | "INCONCLUSIVE"
      selectedClueId: null,
      selectedSuspectId: null,
      accusedSuspectId: null,
      isSolved: false,
      deductionOutcome: null,
      archiveUnlocked: false,
      cipherGuesses: Array(10).fill(""),
      cipherHintsCount: 0
    };

    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultState,
          ...parsed,
          inspectedClues: Array.isArray(parsed.inspectedClues) ? parsed.inspectedClues : [],
          connections: Array.isArray(parsed.connections) ? parsed.connections : [],
          clueVerdicts: (parsed.clueVerdicts && typeof parsed.clueVerdicts === 'object') ? parsed.clueVerdicts : {},
          cipherGuesses: Array.isArray(parsed.cipherGuesses) && parsed.cipherGuesses.length === 10 ? parsed.cipherGuesses : Array(10).fill("")
        };
      }
    } catch (e) {
      console.warn("Could not read localStorage state:", e);
    }
    return defaultState;
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
    this.notify();
  }

  setClueVerdict(clueId, verdict) {
    this.state.clueVerdicts[clueId] = verdict;
    this.saveState();
  }

  getClueVerdict(clueId) {
    return this.state.clueVerdicts[clueId] || "NOT_ASSESSED";
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  getState() {
    return this.state;
  }

  setScreen(screenName) {
    this.state.currentScreen = screenName;
    this.saveState();
  }

  unlockArchive() {
    this.state.archiveUnlocked = true;
    this.saveState();
  }

  setCipherGuess(symbolIndex, letter) {
    const targetMessage = ["F", "I", "N", "D", "T", "H", "E", "K", "E", "Y"];
    const targetLetter = targetMessage[symbolIndex];

    // If letter belongs to a repeating symbol (like 'E' at index 6 and 8), update all matching target positions!
    targetMessage.forEach((l, idx) => {
      if (l === targetLetter) {
        this.state.cipherGuesses[idx] = letter;
      }
    });

    // Check if fully solved
    const currentStr = this.state.cipherGuesses.join("");
    if (currentStr === "FINDTHEKEY") {
      this.state.archiveUnlocked = true;
    }

    this.saveState();
  }

  revealCipherHint() {
    const targetMessage = ["F", "I", "N", "D", "T", "H", "E", "K", "E", "Y"];
    for (let i = 0; i < targetMessage.length; i++) {
      if (this.state.cipherGuesses[i] !== targetMessage[i]) {
        const letter = targetMessage[i];
        targetMessage.forEach((l, idx) => {
          if (l === letter) {
            this.state.cipherGuesses[idx] = letter;
          }
        });
        this.state.cipherHintsCount++;
        break;
      }
    }

    if (this.state.cipherGuesses.join("") === "FINDTHEKEY") {
      this.state.archiveUnlocked = true;
    }
    this.saveState();
  }

  showCipherKey() {
    this.state.cipherGuesses = ["F", "I", "N", "D", "T", "H", "E", "K", "E", "Y"];
    this.state.archiveUnlocked = true;
    this.saveState();
  }

  inspectClue(clueId) {
    if (!this.state.inspectedClues.includes(clueId)) {
      this.state.inspectedClues.push(clueId);
      this.saveState();
    }
  }

  selectClueOnBoard(clueId) {
    this.state.selectedClueId = (this.state.selectedClueId === clueId) ? null : clueId;
    this.saveState();
  }

  selectSuspectOnBoard(suspectId) {
    this.state.selectedSuspectId = (this.state.selectedSuspectId === suspectId) ? null : suspectId;
    this.saveState();
  }

  selectAccusedSuspect(suspectId) {
    this.state.accusedSuspectId = suspectId;
    this.saveState();
  }

  /**
   * Connects a clue to a suspect with duplicate prevention.
   */
  setConnection(clueId, suspectId) {
    this.state.connections = this.state.connections.filter(
      c => c.clueId !== clueId && c.suspectId !== suspectId
    );

    if (suspectId) {
      this.state.connections.push({ clueId, suspectId });
      this.inspectClue(clueId);
    }

    // Reset board selections after connecting
    this.state.selectedClueId = null;
    this.state.selectedSuspectId = null;
    this.saveState();
  }

  removeConnection(clueId) {
    this.state.connections = this.state.connections.filter(c => c.clueId !== clueId);
    this.saveState();
  }

  getConnectionForClue(clueId) {
    return this.state.connections.find(c => c.clueId === clueId);
  }

  getConnectionForSuspect(suspectId) {
    return this.state.connections.find(c => c.suspectId === suspectId);
  }

  getConnectionsForSuspectCount(suspectId) {
    return this.state.connections.filter(c => c.suspectId === suspectId).length;
  }

  /**
   * Calculates overall case status:
   * OPEN: 0 connections and not solved
   * IN PROGRESS: 1-5 connections and not solved
   * SOLVED: if isSolved is true
   */
  getCaseStatus() {
    if (this.state.isSolved) return "SOLVED";
    const count = this.state.connections.length;
    if (count === 0) return "OPEN";
    return "IN PROGRESS";
  }

  /**
   * Submit deduction for accusation
   */
  submitDeduction(suspectId) {
    const isCorrect = (suspectId === "suspect1"); // Moriarty
    if (isCorrect) {
      this.state.isSolved = true;
      this.state.deductionOutcome = "CORRECT";
    } else {
      this.state.deductionOutcome = "INCORRECT";
    }
    this.saveState();
    return isCorrect;
  }

  clearDeductionOutcome() {
    this.state.deductionOutcome = null;
    this.saveState();
  }

  resetProgress() {
    this.state.inspectedClues = [];
    this.state.connections = [];
    this.state.clueVerdicts = {};
    this.state.selectedClueId = null;
    this.state.selectedSuspectId = null;
    this.state.accusedSuspectId = null;
    this.state.isSolved = false;
    this.state.deductionOutcome = null;
    this.saveState();
  }
}

window.caseStore = new CaseStateStore();

