import { Photo } from "./photo"
import { Stack } from "./stack"

export interface Mentor {
    id: number
    userName: string
    photoUrl: string
    isMentor: boolean
    yearsOfExperience: number
    knownAs: string
    created: string
    lastActive: string
    introduction: string
    lookingFor: string
    stack: Stack[]
    city: string
    country: string
    photos: Photo[]
  }

