import files from 'config/ressources';

import Emitter from 'helpers/Emitter';

import { RESSOURCES_PROGRESS } from 'config/messages';

/**
 * AssetsLoader class
 */
class AssetsLoader {

  /**
   * constructor function
   * @param {array} files               Files to load
   * @param {function} onResourceLoaded Called everytime a resource is loaded
   */
  constructor() {

    this.promises = [];
    this.totalProgress = files.length;
    this.currentProgress = 0;

    // const getLoader = type => {
    //   switch( type ) {
    //     case 'image': return new Image();
    //   }
    // };

    files.map( file => {

      const { id, url } = file;

      const promise = new Promise( ( resolve, reject ) => {
        let img = new Image();
        img.onload = function() {
          resolve({ id, img });
          this.currentProgress++;
          Emitter.emit( RESSOURCES_PROGRESS, this.currentProgress / this.totalProgress );

          if(this.currentProgress >= this.totalProgress) {
            this.load();
          }
        }.bind(this);
        img.onerror = reject;
        img.src = url;
      });

      this.promises.push( promise );

    });
  }

  /**
   * load function
   * @return {promise} Promise
   */
  load() {

    return Promise.all( this.promises );
  }

}

export default new AssetsLoader();
