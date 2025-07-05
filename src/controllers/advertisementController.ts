import { Request, Response } from "express";
import Advertisement from "../models/Advertisement";
import { advertisementSchema } from "../schemas";

export const getAdvertisements = async (req: Request, res: Response) => {
  try {
    const advertisements = await Advertisement.find({});
    res.status(200).json(advertisements);
  } catch (e) {
    res.status(500).json({ message: "Server error occured" });
  }
};

export const getAdvertisementsForClient = async (req: Request, res: Response) => {
  try {
    const advertisements = await Advertisement.find({status: 'Published'});
    res.status(200).json(advertisements);
  } catch (e) {
    res.status(500).json({ message: "Server error occured" });
  }
};

export const getAdvertisementById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const advertisement = await Advertisement.findById(id);
    res.status(200).json(advertisement);
  } catch (e) {
    res.status(500).json({ message: "Server error occured" });
  }
};

export const addAdvertisement = async (req: Request, res: Response) => {
  try {
    const advertisementData = advertisementSchema.parse(req.body);
    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${advertisementData.key}`

    const advertisement = await Advertisement.create({advertisementData, image: url});
    res.status(200).json(advertisement);
  } catch (e) {
    res.status(500).json({ message: "Server error occured" });
    console.log(e)
  }
};

export const updateAdvertisement = async (req: Request, res: Response) => {
  try {
    const advertisementData = advertisementSchema.parse(req.body);
    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${advertisementData.key}`

    const advertisement = await Advertisement.findByIdAndUpdate(
      req.params.id,
      {advertisementData, image: url},
      {
        new: true,
        runValidators: true,
      }
    );

    if (advertisement) {
      res.json(advertisement);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Server error occured" });
  }
};

export const deleteAdvertisement = async (req: Request, res: Response) => {
  try {
    const advertisement = await Advertisement.findByIdAndDelete(req.params.id);
    res.status(200).json(advertisement);
  } catch (e) {
    res.status(500).json({ message: "Server error occured" });
  }
}

export const updateAdvertisementStatusById = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const advertisement = await Advertisement.findByIdAndUpdate(req.params.id, {
      status: status as 'Archived'|'Published'
    }, {
      new: true,
      runValidators: true
    });

    if (advertisement) {
      res.json(advertisement);
    } else {
      res.status(404).json({ message: 'Advertisement not found' });
    }
  } catch(e){
    res.status(500).json({ message: "Server error occured" });
  }
}