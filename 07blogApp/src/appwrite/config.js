import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // Using slug as the document ID
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost error: ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // Using slug as the document ID
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost error: ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug // Using slug as the document ID
      );
      return true; // Return true on successful deletion
    } catch (error) {
      log("Appwrite service :: deletePost error: ", error);
      return false; // Return false if deletion fails
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteCollectionId,
        conf.appwriteDatabaseId,
        slug
      );
    } catch (error) {
      log("Appwrite service :: getPosts error: ", error);
      return false; // Return false if fetching fails
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts error: ", error);
      return false;
    }
  }

  //File upload services
  //Usually this sevices are defined in a separate file but for simplicity we are defining it here
  //These files are used to upload files to the appwrite bucket

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(), // Generate a unique ID for the file
        file // The file to be uploaded
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile Error: ", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId, // The ID of the bucket
        fileId // The ID of the file to be deleted
      );
    } catch (error) {
      console.log("Appwrite Service :: deleteFile Error: ", error);
      return false; // Return false if deletion fails
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(
      conf.appwriteBucketId, // The ID of the bucket
      fileId // The ID of the file to get the preview
    );
  }
}

const service = new Service();
export default service;
