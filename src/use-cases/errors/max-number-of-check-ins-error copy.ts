export class MaxNumberOfCheckInsEror extends Error {
  constructor() {
    super('Max number of checkins reached')
  }
}
