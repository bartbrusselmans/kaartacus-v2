export interface BggBoardgame {
  image: {
    _text: string;
  };
  thumbnail: {
    _text: string;
  };
  name: {
    _text: string;
    _atributes: {
      sortindex: string;
    };
  };
  yearpublished: {
    _text: string;
  };
  _attributes: {
    objectid: string;
    objecttype: string;
    subtype: string;
    collid: string;
  };
  numplays: {
    _text: string;
  };
  status: {
    fortrade: '1' | '0';
    own: '1' | '0';
    prevowned: '1' | '0';
    want: '1' | '0';
    wanttoplay: '1' | '0';
    wanttobuy: '1' | '0';
    wishlist: '1' | '0';
    lastmodified: Date;
  };
}
