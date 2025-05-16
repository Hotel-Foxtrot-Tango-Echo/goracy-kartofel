export class OpenGD77Helper {

  static retrieveGroupName(dmrId: number, timeSlot: number):string {
    return `${dmrId} TS${timeSlot}`
  }


  static retrieveCorrectChanelName(repName: string):string {
    return repName.slice(0,15) //max 15 leter
  }

  static retrieveTalkListName(repName: string):string {
    return `${repName}-m73pl`.slice(0,15) //max 15 leter
  }

  static retrieveZoneName(zoneName: string):string {
    return `${zoneName}-m73pl`.slice(0,15) //max 15 leter
  }
}

