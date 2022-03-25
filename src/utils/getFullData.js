import { getAboutMe, getResume, getPortfolio } from '../services';

export default async function getFullData () {
   try {
      const data = await Promise.all([
         { aboutMe: (await getAboutMe())[0] },
         { resumeData: (await getResume())[0] },
         { portfolio: (await getPortfolio())[0] }
      ]);
      return data;
   } catch (error) {
      return error;
   }

}